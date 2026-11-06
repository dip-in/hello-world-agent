import './style.css';
import * as webllm from '@mlc-ai/web-llm';

document.querySelector('#app')!.innerHTML = `
  <div>
    <h1>Hello AI Agent</h2>

    <textarea
      id='input'
      row='5'
      cols='50'
      placeholder='Tell me something...'
    ></textarea>

    <br/><br/>

    <button id="ask">
      Ask Agent
    </button>

    <p id="status">
      Loading model...
    </p>

    <pre id="output"></pre>
  </div>
`;

const status = document.getElementById('status');

const output = document.getElementById('output');

const askBtn = document.getElementById('ask');

const engine = new webllm.MLCEngine();

status.textContent = 'Downloading AI model....';

await engine.reload('Qwen2.5-0.5B-Instruct-q4f16_1-MLC');

status.textContent = 'AI ready';

askBtn?.addEventListener('click', async () => {
  const input = (document.getElementById('input') as HTMLTextAreaElement).value;

  output.textContent = 'Thinking....';

  const response = await engine.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a kind coach. Always answer positively in 2 sentences.`
      },
      {
        role:'user',
        content: input
      }
    ]
  });

  output.textContent = response.choices[0].message.content || '';
});
