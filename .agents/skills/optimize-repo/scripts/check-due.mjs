// SessionStart hook: prints a reminder (added to Claude's context) when the current git repo is due for
// optimize-repo — last run more than 15 days ago, or never run while a known cache folder exists.
// Cheap by design: existence checks only, no size scans. Silent and exit 0 on anything unexpected.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const DUE_DAYS = 15;
const CACHE_DIRS = ['.next', '.next-agent', '.next-verify', '.turbo', 'node_modules/.cache', '.parcel-cache', 'target', 'coverage', 'test-results', 'playwright-report'];

try {
  let cwd = process.cwd();
  try {
    const input = fs.readFileSync(0, 'utf8');
    if (input.trim()) cwd = JSON.parse(input).cwd || cwd;
  } catch {}

  const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  const key = path.resolve(root).replace(/\\/g, '/').toLowerCase();

  let state = {};
  try { state = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'project', 'repo-maintenance.json'), 'utf8')); } catch {}

  const present = CACHE_DIRS.filter((d) => fs.existsSync(path.join(root, d)));
  const last = state[key] ? new Date(state[key]) : null;
  const days = last ? Math.floor((Date.now() - last.getTime()) / 86400000) : null;

  if (last && days < DUE_DAYS) process.exit(0);
  if (!last && present.length === 0) process.exit(0);

  const when = last ? `last run ${days} days ago (${last.toISOString().slice(0, 10)})` : 'never run here';
  console.log(
    `[optimize-repo reminder] Routine repo cleaning is due for ${root}: ${when}; the owner wants it every ${DUE_DAYS} days.` +
      (present.length ? ` Cache folders present: ${present.join(', ')}.` : '') +
      ' At a natural pause (not mid-task), mention it in one line and offer to run the optimize-repo skill.'
  );
} catch {
  // Not a git repo, or git missing: nothing to remind about.
}
process.exit(0);
