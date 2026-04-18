#!/usr/bin/env node
/**
 * Migrates hardcoded hex color values to colors.* references.
 * Run: node scripts/migrate-colors.js
 */

const fs = require('fs');
const path = require('path');

// Map hex (lowercase) → colors key
const HEX_TO_KEY = {
  '#ffffff': 'colors.white',
  '#fff':    'colors.white',
  '#fff':    'colors.white',
  '#000000': 'colors.blackPure',
  '#000':    'colors.blackShort',
  '#2c3e50': 'colors.black',
  '#2d2d2d': 'colors.textDark',
  '#1f2937': 'colors.textPrimary',
  '#111827': 'colors.textHeading',
  '#1e293b': 'colors.textBody',
  '#374151': 'colors.textBodyAlt',
  '#64748b': 'colors.textMuted',
  '#7f8c8d': 'colors.textSecondary',
  '#6b7280': 'colors.textTertiary',
  '#9ca3af': 'colors.textDisabled',
  '#4ecdc4': 'colors.primary',
  '#4db8ac': 'colors.primaryDark',
  '#2bae9b': 'colors.primaryDeep',
  '#26a69a': 'colors.tealActive',
  '#e74c3c': 'colors.secondary',
  '#f39c12': 'colors.accent',
  '#f1c40f': 'colors.yellow',
  '#27ae60': 'colors.leafGreen',
  '#1e8449': 'colors.darkGreen',
  '#10b981': 'colors.successGreen',
  '#3dbe8b': 'colors.successGreenDark',
  '#37b38a': 'colors.successGreenDeep',
  '#2e9e45': 'colors.successGreenAlt',
  '#16a34a': 'colors.emerald',
  '#7b5acf': 'colors.purple',
  '#f3eeff': 'colors.purpleBg',
  '#4f46e5': 'colors.indigo',
  '#2a4fa3': 'colors.indigoDark',
  '#1d4ed8': 'colors.indigoDeep',
  '#2e5bba': 'colors.navy',
  '#3a8edb': 'colors.blue',
  '#ebf4ff': 'colors.blueBg',
  '#0056ff': 'colors.blueAlt',
  '#85c1e9': 'colors.blueLight',
  '#3b82f6': 'colors.slate',
  '#f5b041': 'colors.amber',
  '#fff8ec': 'colors.amberBg',
  '#d97706': 'colors.amberDark',
  '#ffd700': 'colors.gold',
  '#b8860b': 'colors.goldDark',
  '#996600': 'colors.goldDeep',
  '#7a5200': 'colors.goldDeeper',
  '#ffe066': 'colors.yellowLight',
  '#ffe87c': 'colors.yellowPale',
  '#fff5a0': 'colors.yellowPastel',
  '#ff9800': 'colors.orange',
  '#f59e0b': 'colors.orangeAlt',
  '#ffb800': 'colors.orangeFFB',
  '#ef4444': 'colors.error',
  '#f04f4f': 'colors.errorAlt',
  '#e53935': 'colors.errorDeep',
  '#fef2f2': 'colors.errorBg',
  '#fff0f0': 'colors.errorBgAlt',
  '#fee2e2': 'colors.errorBgLight',
  '#fecaca': 'colors.errorBgPale',
  '#ff5a7a': 'colors.pink',
  '#ff0000': 'colors.red',
  '#f9fafb': 'colors.backgroundGrey',
  '#f8fafc': 'colors.backgroundLight',
  '#f8f9fa': 'colors.surface',
  '#f1f5f9': 'colors.surfaceAlt',
  '#e5e7eb': 'colors.border',
  '#f3f4f6': 'colors.borderLight',
  '#d1d5db': 'colors.borderMuted',
  '#e2e8f0': 'colors.borderSlate',
  '#e6f7f5': 'colors.tealBg',
  '#e8f5e9': 'colors.greenBg',
  '#ecfdf5': 'colors.greenBgLight',
  '#dcfce7': 'colors.greenBgPale',
  '#eef2ff': 'colors.indigoBg',
  '#f5f5f5': 'colors.greyLight',
  '#c4c4c4': 'colors.grey',
  '#666666': 'colors.greyMid',
  '#fef3c7': 'colors.amberBgPale',
};

// Regex: matches hex colors in JS/TS string literals or JSX attribute values
// Handles: '#XXXXXX', "#XXXXXX", color="#XXXXXX", color='#XXXXXX'
const HEX_REGEX = /(['"])?(#[0-9A-Fa-f]{3,8})\1/g;

function normalizeHex(hex) {
  return hex.toLowerCase();
}

function getColorKey(hex) {
  return HEX_TO_KEY[normalizeHex(hex)];
}

function needsColorsImport(content) {
  return /from ['"].*theme['"]/.test(content) || /from ['"].*colors['"]/.test(content);
}

function addColorsImport(content, filePath) {
  // Determine relative path to src/theme
  const fileDir = path.dirname(filePath);
  const themePath = path.join('/Users/sayedaamir/Documents/react-native/Future/src/theme');
  let rel = path.relative(fileDir, themePath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;

  // If already imports from theme, add colors to it
  const themeImportRe = /import\s*\{([^}]+)\}\s*from\s*(['"])(.*theme.*)\2/;
  if (themeImportRe.test(content)) {
    return content.replace(themeImportRe, (match, imports, q, mod) => {
      if (imports.includes('colors')) return match;
      return `import {${imports.trimEnd()}, colors } from ${q}${mod}${q}`;
    });
  }

  // If already imports colors directly
  if (/import.*colors.*from/.test(content)) return content;

  // Add new import after last existing import line
  const lastImport = content.lastIndexOf('\nimport ');
  const insertAt = lastImport !== -1
    ? content.indexOf('\n', lastImport + 1) + 1
    : 0;
  const importLine = `import { colors } from '${rel}';\n`;
  return content.slice(0, insertAt) + importLine + content.slice(insertAt);
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  let needsImport = false;

  const newContent = content.replace(HEX_REGEX, (match, quote, hex) => {
    const key = getColorKey(hex);
    if (!key) return match; // unknown color, leave as-is

    changed = true;
    needsImport = true;

    // If it was a quoted string like '#FFFFFF', replace with the colors ref (no quotes)
    if (quote) {
      return key;
    }
    return key;
  });

  if (!changed) return false;

  let result = newContent;
  if (needsImport && !needsColorsImport(content)) {
    result = addColorsImport(result, filePath);
  } else if (needsImport && needsColorsImport(content)) {
    // Make sure colors is in the import
    const themeImportRe = /import\s*\{([^}]+)\}\s*from\s*(['"])(.*theme.*)\2/;
    if (themeImportRe.test(result)) {
      result = result.replace(themeImportRe, (match, imports, q, mod) => {
        if (imports.includes('colors')) return match;
        return `import {${imports.trimEnd()}, colors } from ${q}${mod}${q}`;
      });
    }
  }

  fs.writeFileSync(filePath, result, 'utf8');
  return true;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !['node_modules', '.git', 'android', 'ios'].includes(entry)) {
      walk(full, files);
    } else if (stat.isFile() && /\.(tsx?|js)$/.test(entry) && entry !== 'colors.ts' && !full.includes('scripts/')) {
      files.push(full);
    }
  }
  return files;
}

const srcDir = path.join(__dirname, '..', 'src');
const files = walk(srcDir);
let migratedCount = 0;

for (const f of files) {
  if (migrateFile(f)) {
    console.log('✓', path.relative(process.cwd(), f));
    migratedCount++;
  }
}

console.log(`\nDone. Migrated ${migratedCount} files.`);
