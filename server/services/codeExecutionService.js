import axios from 'axios';
const runtimes = { javascript: { language: 'javascript', version: '18.15.0' }, python: { language: 'python', version: '3.10.0' }, cpp: { language: 'c++', version: '10.2.0' } };
export async function execute({ language, source_code, stdin }) {
  if (process.env.CODE_EXECUTION_MODE !== 'piston') return { stdout: 'Mock execution enabled. Configure Piston to run untrusted code.', stderr: '', status: 'mock', time: '0ms', mock: true };
  try { const r = await axios.post(process.env.CODE_EXECUTION_API_URL, { ...runtimes[language], files: [{ content: source_code }], stdin }, { timeout: 10000 }); const run = r.data.run; return { stdout: run.stdout || '', stderr: run.stderr || '', status: run.code === 0 ? 'accepted' : 'error', time: 'external', mock: false }; } catch { return { stdout: '', stderr: 'Execution provider temporarily unavailable.', status: 'unavailable', time: '', mock: false }; }
}
