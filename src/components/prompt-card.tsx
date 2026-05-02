import type { PromptSeed } from "@/types/prompt-library";

export function PromptCard({ prompt }: { prompt: PromptSeed }) {
  return (
    <article className="card prompt-card">
      <div>
        <h3>{prompt.title}</h3>
        <p>{prompt.intendedOutcome}</p>
      </div>
      <div className="field-group">
        <h4>Prompt</h4>
        <pre className="prompt-text">{prompt.promptText}</pre>
      </div>
      <div className="field-group">
        <h4>Suggested inputs</h4>
        <p>{prompt.suggestedInputs}</p>
      </div>
      <div className="field-group">
        <h4>Usage note</h4>
        <p>{prompt.usageNote}</p>
      </div>
      {prompt.responsibleUseNote ? (
        <p className="notice warning">{prompt.responsibleUseNote}</p>
      ) : null}
      <ul className="tag-list" aria-label={`${prompt.title} tags`}>
        {prompt.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
