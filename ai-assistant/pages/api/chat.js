import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    let reply = '';

    const ollama = spawn('ollama', ['run', 'llama3'], { stdio: ['pipe', 'pipe', 'pipe'] });

    ollama.stdin.write(message + '\n');
    ollama.stdin.end();

    ollama.stdout.on('data', (data) => {
      reply += data.toString();
    });

    ollama.stderr.on('data', (err) => {
      console.error('OLLAMA STDERR:', err.toString());
    });

    ollama.on('close', () => {
      if (reply.trim() === '') {
        return res.status(500).json({ error: 'No response from LLM.' });
      }

      res.status(200).json({ reply: reply.trim() });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}