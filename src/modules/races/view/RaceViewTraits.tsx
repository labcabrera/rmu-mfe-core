/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, Collapse, IconButton, Stack, Typography } from '@mui/material';
import {
  AddButton,
  DeleteButton,
  DeleteDialog,
  deleteRaceTrait,
  fetchTraits,
  Panel,
  Race,
  RaceTrait,
  Trait,
  TraitTypeChip,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { romanNumeral } from '../../shared/display/StatChips';
import { Bento, span } from '../../shared/layout/Bento';
import AddRaceTraitDialog from './traits/AddRaceTraitDialog';

/** Development point cost of a trait at a tier, as strategic charges it. */
const traitCost = (trait: Trait, tier?: number) =>
  (trait.adquisitionCost || 0) + (trait.isTierBased && tier && tier > 1 ? (tier - 1) * (trait.tierCost || 0) : 0);

/** One trait or talent: name, type, tier and cost, with the description folded below. */
const TraitRow: FC<{
  name: string;
  trait?: Trait;
  tier?: number;
  isTalent?: boolean;
  details: ReactNode[];
  action?: ReactNode;
}> = ({ name, trait, tier, isTalent, details, action }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const shown = details.filter(Boolean);
  const talent = isTalent ?? trait?.isTalent;
  return (
    <Box sx={{ py: 1 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, flex: '1 1 160px', minWidth: 0 }}>
          {name}
          {tier ? ` ${romanNumeral(tier)}` : ''}
        </Typography>
        {talent !== undefined && <TraitTypeChip isTalent={talent} />}
        {trait && (
          <Chip
            size="small"
            variant="outlined"
            label={t('trait-cost-dp', { cost: traitCost(trait, tier) })}
            sx={{ fontWeight: 600 }}
          />
        )}
        {shown.length > 0 && (
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            aria-label={t(open ? 'collapse' : 'expand')}
          >
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        )}
        {action}
      </Stack>
      {shown.length > 0 && (
        <Collapse in={open} unmountOnExit>
          <Stack spacing={0.5} sx={{ pt: 0.5 }}>
            {shown.map((detail, index) => (
              <Typography key={index} variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {detail}
              </Typography>
            ))}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
};

const Rows = ({ children }: { children: ReactNode[] }) => (
  <Stack divider={<Box sx={{ borderBottom: 1, borderColor: 'divider' }} />}>{children}</Stack>
);

/** Traits section of a race: its traits (with add and remove) and its talents, with the catalog cost and type. */
const RaceViewTraits: FC<{
  race: Race;
  setRace: (race: Race) => void;
}> = ({ race, setRace }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [traitToDelete, setTraitToDelete] = useState<RaceTrait>();
  const [catalog, setCatalog] = useState<Map<string, Trait>>(new Map());
  const talents = race.talents ?? [];
  const ids = [...new Set([...race.traits.map((trait) => trait.traitId), ...talents])].sort();

  useEffect(() => {
    if (ids.length === 0) return;
    fetchTraits(`id=in=(${ids.join(',')})`, 0, ids.length, auth)
      .then((response) => setCatalog(new Map(response.content.map((trait) => [trait.id, trait]))))
      .catch(notify.error);
  }, [ids.join(',')]);

  const onDeleteTrait = () => {
    if (!traitToDelete) return;
    deleteRaceTrait(race.id, traitToDelete.id, auth)
      .then((response) => {
        setRace(response);
        setTraitToDelete(undefined);
      })
      .catch(notify.error);
  };

  const traitName = (id: string) => t(id, { defaultValue: catalog.get(id)?.name ?? id });

  return (
    <Bento>
      <Box sx={span(12, talents.length > 0 ? 8 : 12)}>
        <Panel title={t('traits')} extra={<AddButton onClick={() => setAddDialogOpen(true)} />}>
          {race.traits.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t('race-has-no-traits')}
            </Typography>
          ) : (
            <Rows>
              {race.traits.map((raceTrait) => {
                const trait = catalog.get(raceTrait.traitId);
                return (
                  <TraitRow
                    key={raceTrait.id}
                    name={traitName(raceTrait.traitId)}
                    trait={trait}
                    tier={raceTrait.tier}
                    details={[
                      raceTrait.modifier ? `${t('modifier')}: ${raceTrait.modifier}` : null,
                      raceTrait.description ?? null,
                      trait?.description ?? null,
                    ]}
                    action={<DeleteButton onClick={() => setTraitToDelete(raceTrait)} />}
                  />
                );
              })}
            </Rows>
          )}
        </Panel>
      </Box>
      {talents.length > 0 && (
        <Box sx={span(12, 4)}>
          <Panel title={t('talents')}>
            <Rows>
              {talents.map((talent) => (
                <TraitRow
                  key={talent}
                  name={traitName(talent)}
                  trait={catalog.get(talent)}
                  isTalent
                  details={[catalog.get(talent)?.description ?? null]}
                />
              ))}
            </Rows>
          </Panel>
        </Box>
      )}
      <AddRaceTraitDialog open={addDialogOpen} race={race} setRace={setRace} onClose={() => setAddDialogOpen(false)} />
      <DeleteDialog
        message={t('confirmation-delete-message')}
        open={Boolean(traitToDelete)}
        onDelete={onDeleteTrait}
        onClose={() => setTraitToDelete(undefined)}
      />
    </Bento>
  );
};

export default RaceViewTraits;
