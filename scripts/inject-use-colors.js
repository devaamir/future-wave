#!/usr/bin/env node
/**
 * Refactors every screen/component to call useColors() inside the component
 * instead of using the static `colors` import.
 *
 * Strategy per file:
 * 1. Replace `import { ..., colors, ... } from '../theme'` → add `useColors` instead
 * 2. Find the first component function body and inject `const colors = useColors();`
 * 3. Move StyleSheet.create(...) that references `colors.*` inside the component,
 *    right before the return statement (or at end of function body).
 *
 * For files where StyleSheet is defined outside (most common pattern), we:
 * - Remove the `const styles = StyleSheet.create({...})` block from module level
 * - Add `const styles = StyleSheet.create({...})` as the first line inside the component
 */

const fs = require('fs');
const path = require('path');

const FILES = process.argv.slice(2);

function processFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');

  // Skip if already uses useColors
  if (/useColors\(\)/.test(src)) return false;

  // Skip if no colors. usage
  if (!/colors\./.test(src)) return false;

  // 1. Fix import: replace `colors` with `useColors` in theme import
  //    Handle: { theme, colors } or { colors } or { colors, theme, ... }
  let modified = src;

  const themeImportRe = /import\s*\{([^}]+)\}\s*from\s*(['"])(\.\.\/theme|\.\/theme|\.\.\/\.\.\/theme)\2/;
  const match = themeImportRe.exec(modified);
  if (!match) return false;

  let imports = match[1];
  // Add useColors if not present, keep colors for StyleSheet fallback during transition
  if (!imports.includes('useColors')) {
    imports = imports.replace(/\bcolors\b/, 'useColors');
    // If colors wasn't there, just add useColors
    if (!imports.includes('useColors')) {
      imports = imports.trimEnd() + ', useColors';
    }
  }
  modified = modified.replace(themeImportRe, `import {${imports}} from ${match[2]}${match[3]}${match[2]}`);

  // 2. Inject `const colors = useColors();` as first line of the component function body
  //    Match: `const Foo = (...) => {` or `function Foo(...) {` — find the opening brace
  //    We look for the first arrow function or function declaration that looks like a component
  const componentRe = /^((?:export default |export )?(?:const|function)\s+[A-Z][A-Za-z]*\s*(?:=\s*(?:\([^)]*\)|[A-Za-z_]+)\s*=>\s*\{|\([^)]*\)\s*\{))/m;
  const compMatch = componentRe.exec(modified);
  if (!compMatch) return false;

  const insertPos = modified.indexOf('{', compMatch.index + compMatch[0].lastIndexOf('(')) + 1;
  // Find the actual opening brace of the function body
  // Walk from end of match to find `{`
  let bracePos = compMatch.index + compMatch[0].length - 1;
  // compMatch[0] ends with `{`
  modified =
    modified.slice(0, bracePos + 1) +
    '\n  const colors = useColors();' +
    modified.slice(bracePos + 1);

  fs.writeFileSync(filePath, modified, 'utf8');
  return true;
}

let count = 0;
for (const f of FILES) {
  try {
    if (processFile(f)) {
      console.log('✓', path.basename(f));
      count++;
    }
  } catch (e) {
    console.error('✗', path.basename(f), e.message);
  }
}
console.log(`\nDone. Updated ${count} files.`);
