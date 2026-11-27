// Foundation pages. Every page reads tokens/tokens.json, so a token added there appears here without an edit.
import { type CSSProperties, type ReactNode, useState } from 'react';

import tokens from '../../tokens/tokens.json';
import { contrastRatio, textPairs } from './contrast';

const page: CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  maxWidth: 960,
  width: '100%',
  padding: 16,
};
const table: CSSProperties = { borderCollapse: 'collapse', width: '100%', fontSize: 14 };
const cell: CSSProperties = {
  borderBottom: '1px solid var(--border)',
  padding: '8px 12px',
  textAlign: 'left',
  verticalAlign: 'middle',
};

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <table style={table}>
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} style={{ ...cell, fontWeight: 600 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return <td style={{ ...cell, ...style }}>{children}</td>;
}

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 4px' }}>{title}</h2>
      {note ? (
        <p style={{ fontSize: 14, color: 'var(--muted-foreground)', margin: '0 0 12px' }}>{note}</p>
      ) : null}
      {children}
    </section>
  );
}

// The token name as a button that copies it.
export function CopyName({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title="Copy the token name"
      onClick={() => {
        void navigator.clipboard?.writeText(name).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        });
      }}
      style={{
        cursor: 'pointer',
        minHeight: 40,
        padding: '0 8px',
        border: '1px solid var(--border)',
        borderRadius: 6,
        background: 'transparent',
        color: 'inherit',
        fontFamily: 'var(--font-family-mono)',
        fontSize: 13,
      }}
    >
      {copied ? 'Copied' : name}
    </button>
  );
}

const colorByName = (list: { name: string; value: string }[]) =>
  Object.fromEntries(list.map((c) => [c.name, c.value]));

function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 40,
        height: 24,
        borderRadius: 4,
        border: '1px solid var(--border)',
        background: value,
        verticalAlign: 'middle',
        marginRight: 8,
      }}
    />
  );
}

function Ratio({ text, on, mode }: { text?: string; on?: string; mode: 'light' | 'dark' }) {
  const colors = colorByName(tokens.color[mode]);
  if (!text || !on || !colors[text] || !colors[on]) return <span>-</span>;
  const ratio = contrastRatio(colors[text], colors[on]);
  if (ratio === null) return <span>-</span>;
  const pass = ratio >= 4.5;
  return (
    <span>
      {ratio.toFixed(2)}:1 {pass ? 'AA' : 'below AA'}
    </span>
  );
}

export function ColorsPage() {
  const light = colorByName(tokens.color.light);
  const dark = colorByName(tokens.color.dark);
  const pairs = textPairs(tokens.color.light.map((c) => c.name));
  const onFor = (name: string) => pairs.find((p) => p.text === name)?.on;
  return (
    <div style={page}>
      <h1>Colors</h1>
      <p>{tokens.color.theme}</p>
      <p style={{ fontSize: 14 }}>{tokens.color.mode}</p>
      <Section
        title="Color tokens"
        note="Each token with its light and dark value. The ratio is the WCAG contrast of the text color on its background (AA needs 4.5:1)."
      >
        <Table head={['Token', 'Light', 'Dark', 'Contrast light', 'Contrast dark', 'Use']}>
          {tokens.color.light.map((c) => {
            const on = onFor(c.name);
            return (
              <tr key={c.name}>
                <Td>
                  <CopyName name={c.name} />
                </Td>
                <Td>
                  <Swatch value={c.value} />
                  <code>{c.value}</code>
                </Td>
                <Td>
                  <Swatch value={dark[c.name] ?? ''} />
                  <code>{dark[c.name]}</code>
                </Td>
                <Td>
                  <Ratio text={c.name} on={on} mode="light" />
                  {on ? <small> on {on}</small> : null}
                </Td>
                <Td>
                  <Ratio text={c.name} on={on} mode="dark" />
                </Td>
                <Td>{c.use}</Td>
              </tr>
            );
          })}
        </Table>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          {Object.keys(light).length} tokens in light, {Object.keys(dark).length} in dark.
        </p>
      </Section>
    </div>
  );
}

const fontSizeByName = Object.fromEntries(tokens.fontSize.map((s) => [s.name, s]));

export function TypographyPage() {
  return (
    <div style={page}>
      <h1>Typography</h1>
      <Section title="Fonts">
        <Table head={['Token', 'Stack']}>
          <tr>
            <Td>
              <CopyName name="font-sans" />
            </Td>
            <Td style={{ fontFamily: tokens.font.sans }}>{tokens.font.sans}</Td>
          </tr>
          <tr>
            <Td>
              <CopyName name="font-mono" />
            </Td>
            <Td style={{ fontFamily: tokens.font.mono }}>{tokens.font.mono}</Td>
          </tr>
        </Table>
        <p style={{ fontSize: 14 }}>
          Pretendard {tokens.font.pretendard.version}, {tokens.font.pretendard.license}.
          font-display: {tokens.font.pretendard.fontDisplay}.
        </p>
        <p style={{ fontSize: 14 }}>{tokens.font.pretendard.delivery}</p>
      </Section>
      <Section title="Font sizes" note="12px is the floor: no text on any screen is smaller.">
        <Table head={['Token', 'Size', 'Line height', 'Sample', 'Use']}>
          {tokens.fontSize.map((s) => (
            <tr key={s.name}>
              <Td>
                <CopyName name={`text-${s.name}`} />
              </Td>
              <Td>
                {s.size} ({s.px}px)
              </Td>
              <Td>{s.lineHeight}</Td>
              <Td style={{ fontSize: s.size, lineHeight: s.lineHeight }}>Sample text</Td>
              <Td>{s.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Font weights">
        <Table head={['Token', 'Value', 'Sample', 'Use']}>
          {tokens.fontWeight.map((w) => (
            <tr key={w.name}>
              <Td>
                <CopyName name={`font-${w.name}`} />
              </Td>
              <Td>{w.value}</Td>
              <Td style={{ fontWeight: w.value }}>Sample text</Td>
              <Td>{w.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section
        title="Text styles"
        note="The mobile size is the default; from md (768px) it grows to the size on the right."
      >
        <Table
          head={[
            'Style',
            'Element',
            'Mobile',
            'md and up',
            'Weight',
            'Tracking',
            'Color',
            'Sample',
            'Use',
          ]}
        >
          {tokens.textStyles.map((s) => {
            const size = fontSizeByName[s.size];
            const weight = tokens.fontWeight.find((w) => w.name === s.weight);
            return (
              <tr key={s.name}>
                <Td>
                  <CopyName name={s.name} />
                </Td>
                <Td>
                  <code>{s.element}</code>
                </Td>
                <Td>{size?.px}px</Td>
                <Td>{fontSizeByName[s.sizeMd]?.px}px</Td>
                <Td>{weight?.value}</Td>
                <Td>{s.tracking}</Td>
                <Td>{s.color}</Td>
                <Td
                  style={{
                    fontSize: size?.size,
                    fontWeight: weight?.value,
                    letterSpacing: s.tracking,
                    color: `var(--${s.color})`,
                  }}
                >
                  Sample
                </Td>
                <Td>{s.use}</Td>
              </tr>
            );
          })}
        </Table>
      </Section>
    </div>
  );
}

export function SpacingPage() {
  return (
    <div style={page}>
      <h1>Spacing and layout</h1>
      <Section title="Spacing scale" note={tokens.spacing.rule}>
        <Table head={['Step', 'Size', 'Sample']}>
          {[1, 2, 3, 4, 6, 8, 12].map((n) => (
            <tr key={n}>
              <Td>
                <CopyName name={`spacing-${n}`} />
              </Td>
              <Td>{n * 4}px</Td>
              <Td>
                <span
                  style={{
                    display: 'inline-block',
                    height: 12,
                    width: n * 4,
                    background: 'var(--primary)',
                  }}
                />
              </Td>
            </tr>
          ))}
        </Table>
        <p style={{ fontSize: 14 }}>Base unit: {tokens.spacing.base}.</p>
      </Section>
      <Section title="Layout tokens" note="Values change at the md and lg breakpoints.">
        <Table head={['Token', 'Mobile', 'md', 'lg', 'Use']}>
          {tokens.spacing.layout.map((l) => (
            <tr key={l.name}>
              <Td>
                <CopyName name={l.name} />
              </Td>
              <Td>{l.mobile}</Td>
              <Td>{l.md}</Td>
              <Td>{l.lg}</Td>
              <Td>{l.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Breakpoints">
        <Table head={['Name', 'Min width', 'Use']}>
          {tokens.breakpoints.map((b) => (
            <tr key={b.name}>
              <Td>
                <CopyName name={b.name} />
              </Td>
              <Td>
                {b.minWidth} ({b.px}px)
              </Td>
              <Td>{b.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Responsive rules">
        <ul style={{ fontSize: 14, lineHeight: 1.6 }}>
          <li>{tokens.responsive.approach}</li>
          <li>Minimum width: {tokens.responsive.minWidth}.</li>
          <li>
            Touch target: {tokens.responsive.touchTarget}. {tokens.responsive.touchRule}
          </li>
          <li>{tokens.responsive.safeArea}</li>
          <li>{tokens.responsive.verify}</li>
        </ul>
      </Section>
    </div>
  );
}

const shadows: Record<string, string> = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

export function ShapesPage() {
  return (
    <div style={page}>
      <h1>Radius, borders and shadows</h1>
      <Section title="Radius">
        <Table head={['Token', 'CSS variable', 'Value', 'Sample', 'Use']}>
          {tokens.radius.map((r) => (
            <tr key={r.name}>
              <Td>
                <CopyName name={`rounded-${r.name}`} />
              </Td>
              <Td>
                <code>{r.css}</code>
              </Td>
              <Td>
                {r.value} ({r.px}px)
              </Td>
              <Td>
                <span
                  style={{
                    display: 'inline-block',
                    width: 56,
                    height: 40,
                    border: '1px solid var(--foreground)',
                    borderRadius: r.px,
                  }}
                />
              </Td>
              <Td>{r.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Border" note={tokens.border.rule}>
        <p style={{ fontSize: 14 }}>
          Width: <code>{tokens.border.width}</code>
        </p>
      </Section>
      <Section title="Shadows">
        <Table head={['Token', 'Sample', 'Use']}>
          {tokens.shadow.map((s) => (
            <tr key={s.name}>
              <Td>
                <CopyName name={`shadow-${s.name}`} />
              </Td>
              <Td>
                <span
                  style={{
                    display: 'inline-block',
                    width: 80,
                    height: 40,
                    borderRadius: 8,
                    background: 'var(--card)',
                    boxShadow: shadows[s.name],
                  }}
                />
              </Td>
              <Td>{s.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
    </div>
  );
}

export function IconsPage() {
  return (
    <div style={page}>
      <h1>Icons and emoji</h1>
      <Section
        title="Icon sizes"
        note="Icons come from lucide-react (ADR-0007). Squares below show the size; no icon package is bundled in the showcase."
      >
        <Table head={['Token', 'Size', 'Sample', 'Use']}>
          {tokens.icon.map((i) => (
            <tr key={i.name}>
              <Td>
                <CopyName name={`icon-${i.name}`} />
              </Td>
              <Td>{i.px}px</Td>
              <Td>
                <span
                  style={{
                    display: 'inline-block',
                    width: i.px,
                    height: i.px,
                    border: '2px solid var(--foreground)',
                    borderRadius: 4,
                  }}
                />
              </Td>
              <Td>{i.use}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section
        title="Emoji"
        note="Emoji use Fluent Emoji Flat images (ADR-0007), not system emoji fonts, so they look the same on every device."
      >
        <p style={{ fontSize: 14 }}>The emoji component page is added with the component kit.</p>
      </Section>
    </div>
  );
}

export function MotionPage() {
  return (
    <div style={page}>
      <h1>Motion, layers and loading</h1>
      <Section title="Motion" note={tokens.motion.rule}>
        <Table head={['Token', 'Value']}>
          {(['fast', 'normal', 'slow'] as const).map((k) => (
            <tr key={k}>
              <Td>
                <CopyName name={`duration-${k}`} />
              </Td>
              <Td>{tokens.motion[k]}</Td>
            </tr>
          ))}
          <tr>
            <Td>
              <CopyName name="ease-standard" />
            </Td>
            <Td>{tokens.motion.easing}</Td>
          </tr>
        </Table>
      </Section>
      <Section title="Layers (z-index)">
        <Table head={['Token', 'Value', 'Use']}>
          {tokens.zIndex.map((z) => (
            <tr key={z.name}>
              <Td>
                <CopyName name={`z-${z.name}`} />
              </Td>
              <Td>{z.value}</Td>
              <Td>{'use' in z ? z.use : ''}</Td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Loading" note={tokens.loading.rule}>
        <ul style={{ fontSize: 14, lineHeight: 1.6 }}>
          <li>Skeleton: {tokens.loading.skeleton}</li>
          <li>Spinner: {tokens.loading.spinner}</li>
        </ul>
      </Section>
    </div>
  );
}
