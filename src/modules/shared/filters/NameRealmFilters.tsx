/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { fetchRealms, FilterBar, Realm, rsqlAnd, SearchField, SelectRealm, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Filters of the race and culture lists (name and realm), reported as an RSQL query. */
export default function NameRealmFilters({
  onChange,
  realmField = 'realmId',
}: {
  onChange: (rsql: string) => void;
  /** RSQL field of the realm id: `realmId` for races, `realm.id` for cultures. */
  realmField?: string;
}) {
  const auth = useAuth();
  const notify = useNotify();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [name, setName] = useState('');
  const [realmId, setRealmId] = useState('');

  useEffect(() => {
    onChange(
      rsqlAnd([
        ['name=re=', name],
        [`${realmField}==`, realmId],
      ])
    );
  }, [name, realmId]);

  useEffect(() => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch(notify.error);
  }, []);

  return (
    <FilterBar>
      <SearchField value={name} onChange={setName} />
      <SelectRealm value={realmId} onChange={(id) => setRealmId(id ?? '')} realms={realms} />
    </FilterBar>
  );
}
