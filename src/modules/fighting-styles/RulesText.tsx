import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { DataTable, DataTableColumn } from '@labcabrera-rmu/rmu-react-shared-lib';

/**
 * Renders the subset of Markdown used by the converted rulebooks: paragraphs, "- " lists, "####" headings, pipe
 * tables and **bold** / *italic* text.
 */
const RulesText: FC<{ text: string }> = ({ text }) => (
  <Box sx={{ '& > *:not(:last-child)': { mb: 1.5 } }}>
    {blocks(text).map((block, index) => (
      <Block key={index} lines={block} />
    ))}
  </Box>
);

const Block: FC<{ lines: string[] }> = ({ lines }) => {
  const first = lines[0];
  if (first.startsWith('#')) {
    return <Typography variant="subtitle2">{inline(first.replace(/^#+\s*/, ''))}</Typography>;
  }
  if (first.startsWith('|')) {
    const [header, ...rows] = lines.filter((line) => !/^\|[\s|:-]+\|$/.test(line)).map(cells);
    const columns: DataTableColumn<{ index: number; cells: string[] }>[] = header.map((cell, index) => ({
      key: String(index),
      header: inline(cell),
      render: (row) => inline(row.cells[index] ?? ''),
    }));
    return (
      <DataTable
        columns={columns}
        rows={rows.map((row, index) => ({ index, cells: row }))}
        getKey={(row) => String(row.index)}
      />
    );
  }
  if (first.startsWith('- ')) {
    return (
      <Box component="ul" sx={{ m: 0, pl: 3 }}>
        {lines.map((line, index) => (
          <Typography key={index} component="li" variant="body2" sx={{ mb: 0.5 }}>
            {inline(line.slice(2))}
          </Typography>
        ))}
      </Box>
    );
  }
  return <Typography variant="body2">{inline(lines.join(' ').replace(/^\\/, ''))}</Typography>;
};

/** Groups the lines in blocks: blank lines split them, and a list item or a heading starts a new one. */
const blocks = (text: string): string[][] => {
  const result: string[][] = [];
  let current: string[] = [];
  const flush = () => {
    if (current.length > 0) result.push(current);
    current = [];
  };
  text.split('\n').forEach((raw) => {
    const line = raw.trim();
    if (!line) return flush();
    const kind = (value: string) => (value.startsWith('- ') ? 'list' : value.startsWith('|') ? 'table' : 'text');
    if (line.startsWith('#') || (current.length > 0 && kind(current[0]) !== kind(line))) flush();
    current.push(line);
    if (line.startsWith('#')) flush();
  });
  flush();
  return result;
};

const cells = (line: string): string[] =>
  line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const inline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });

export default RulesText;
