// Runs tsc and node the way the commands in the terminal do, and collects what
// they print, so a check program can assert on it.
import { spawnSync } from "node:child_process";

export function tsc(cwd: string, ...args: string[]) {
  const run = spawnSync("npx", ["tsc", ...args], { encoding: "utf8", cwd });
  const codes = (run.stdout.match(/error TS\d+/g) ?? []).map((e) => e.slice(6));
  return { status: run.status, stdout: run.stdout, codes };
}

export function node(cwd: string, ...args: string[]) {
  const run = spawnSync("node", args, { encoding: "utf8", cwd });
  return { status: run.status, stdout: run.stdout, stderr: run.stderr };
}
