// Records that optimize-repo ran for a repo, so the SessionStart reminder resets.
// Usage: node record-run.mjs "<repo root>"   (defaults to the current directory)
import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(process.argv[2] ?? process.cwd()).replace(/\\/g, '/').toLowerCase();

const STATE = path.join(path.resolve(process.argv[2] ?? process.cwd()), 'docs', 'project', 'repo-maintenance.json');

let state = {};
try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch {}
state[repo] = new Date().toISOString();
fs.mkdirSync(path.dirname(STATE), { recursive: true });
fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n');
console.log(`optimize-repo: recorded ${repo} at ${state[repo]}`);
