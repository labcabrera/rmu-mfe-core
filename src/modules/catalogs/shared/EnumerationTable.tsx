import React, { Dispatch, FC, SetStateAction } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';
import { Enumeration } from '../../api/enumerations.dto';

type Props = {
  enumerations: Enumeration[];
  setEnumerations: Dispatch<SetStateAction<Enumeration[]>> | undefined;
};

const EnumerationTable: FC<Props> = ({ enumerations, setEnumerations }) => {
  const onDelete = (id: string) => {
    const newList = enumerations.filter((e) => e.id !== id);
    setEnumerations!(newList);
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Realm</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enumerations.map((en) => (
              <tr key={en.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #f1f1f1' }}>{en.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f1f1f1' }}>{en.category}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f1f1f1' }}>{en.realmId ?? '-'}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #f1f1f1' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(en.id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
            {enumerations.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '8px' }}>
                  No enumerations found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default EnumerationTable;
