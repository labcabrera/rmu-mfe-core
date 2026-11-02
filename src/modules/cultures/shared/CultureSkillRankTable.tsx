import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CultureSkillRank,
  DataTable,
  DataTableColumn,
  DeleteButton,
  DeleteDialog,
  useSpecializationLabel,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { cultureSkillRankTarget, cultureSkillRankTypeLabel } from './culture-skill-ranks';

/** Typed skill rank entries of a culture. Entries are deleted by their position in the list. */
const CultureSkillRankTable: FC<{
  entries: CultureSkillRank[] | undefined;
  onDelete?: (index: number) => void;
}> = ({ entries, onDelete }) => {
  const { t } = useTranslation();
  // Spec 050: re-renders when the names of the catalog keys arrive
  useSpecializationLabel();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const confirmDelete = () => {
    if (selectedIndex === undefined || !onDelete) return;
    onDelete(selectedIndex);
    setSelectedIndex(undefined);
  };

  const columns: DataTableColumn<{ entry: CultureSkillRank; index: number }>[] = [
    { key: 'type', header: t('type'), render: ({ entry }) => cultureSkillRankTypeLabel(entry.type, t) },
    { key: 'target', header: t('target'), render: ({ entry }) => cultureSkillRankTarget(entry, t) },
    { key: 'ranks', header: t('ranks'), align: 'right', render: ({ entry }) => entry.ranks },
    {
      key: 'max',
      header: t('max-ranks-per-skill'),
      align: 'right',
      render: ({ entry }) => entry.maxRanksPerSkill,
    },
    ...(onDelete
      ? [
          {
            key: 'delete',
            header: '',
            render: ({ index }: { index: number }) => <DeleteButton onClick={() => setSelectedIndex(index)} />,
          },
        ]
      : []),
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={(entries ?? []).map((entry, index) => ({ entry, index }))}
        getKey={({ index }) => String(index)}
        emptyTitle={t('no-skills-added')}
      />
      <DeleteDialog
        message={t('confirmation-delete-message')}
        open={selectedIndex !== undefined}
        onDelete={confirmDelete}
        onClose={() => setSelectedIndex(undefined)}
      />
    </>
  );
};

export default CultureSkillRankTable;
