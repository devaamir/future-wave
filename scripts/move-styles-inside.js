#!/usr/bin/env node
/**
 * Moves `const styles = StyleSheet.create({...})` from module level
 * into the component as `const styles = useMemo(() => StyleSheet.create({...}), [colors])`.
 *
 * This ensures styles recompute when the colors palette changes.
 */

const fs = require('fs');

const FILES = process.argv.slice(2);

function findMatchingBrace(src, openPos) {
  let depth = 0;
  for (let i = openPos; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function processFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');

  // Must have useColors() already injected
  if (!/const colors = useColors\(\)/.test(src)) return false;

  // Find `const styles = StyleSheet.create({`
  const stylesRe = /^const styles = StyleSheet\.create\(\{/m;
  const stylesMatch = stylesRe.exec(src);
  if (!stylesMatch) return false;

  // Check it's at module level (not already inside a function)
  // Simple heuristic: count braces before it — if balanced, it's module level
  const before = src.slice(0, stylesMatch.index);
  let depth = 0;
  for (const ch of before) {
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }
  if (depth !== 0) return false; // already inside a block

  // Find the full extent of StyleSheet.create({...})
  const openBrace = src.indexOf('{', stylesMatch.index + 'const styles = StyleSheet.create('.length);
  const closeBrace = findMatchingBrace(src, openBrace);
  if (closeBrace === -1) return false;

  // The full block: `const styles = StyleSheet.create({...});`
  const blockEnd = src.indexOf(';', closeBrace) + 1;
  const stylesBlock = src.slice(stylesMatch.index, blockEnd);

  // Extract just the object literal `{...}`
  const objectLiteral = src.slice(openBrace, closeBrace + 1);

  // Build the replacement: useMemo version
  const useMemoBlock = `const styles = useMemo(() => StyleSheet.create(${objectLiteral}), [colors]);`;

  // Remove the module-level block (and any blank line after it)
  let newSrc = src.slice(0, stylesMatch.index) + src.slice(blockEnd).replace(/^\n/, '');

  // Inject useMemo block right after `const colors = useColors();`
  newSrc = newSrc.replace(
    'const colors = useColors();',
    `const colors = useColors();\n  ${useMemoBlock}`
  );

  // Ensure useMemo is imported from react
  const reactImportRe = /import React(?:,\s*\{([^}]*)\})?\s*from\s*'react'/;
  const reactMatch = reactImportRe.exec(newSrc);
  if (reactMatch) {
    const existing = reactMatch[1] || '';
    if (!existing.includes('useMemo')) {
      const newImports = existing.trim() ? `{ ${existing.trim()}, useMemo }` : '{ useMemo }';
      newSrc = newSrc.replace(reactMatch[0], `import React, ${newImports} from 'react'`);
    }
  }

  fs.writeFileSync(filePath, newSrc, 'utf8');
  return true;
}

let count = 0;
for (const f of FILES) {
  try {
    if (processFile(f)) {
      console.log('✓', require('path').basename(f));
      count++;
    } else {
      console.log('–', require('path').basename(f), '(skipped)');
    }
  } catch (e) {
    console.error('✗', require('path').basename(f), e.message);
  }
}
console.log(`\nDone. Updated ${count} files.`);
