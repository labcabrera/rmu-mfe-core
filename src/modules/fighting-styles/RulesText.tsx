import React, { FC, ReactNode } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

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
    const rows = lines.filter((line) => !/^\|[\s|:-]+\|$/.test(line)).map(cells);
    return (
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ width: 'auto', '& td, & th': { px: { xs: 0.75, sm: 2 } } }}>
          <TableHead>
            <TableRow>
              {rows[0].map((cell, index) => (
                <TableCell key={index}>{inline(cell)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, index) => (
                  <TableCell key={index}>{inline(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
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
