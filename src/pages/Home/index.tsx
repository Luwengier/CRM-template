import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GenericTable, GridColList, useTableQueryState } from 'features/table'

const Home = () => {
  const tableProps = useTableQueryState()
  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        Home
      </Typography>

      <GenericTable {...tableProps} columns={cols} rows={rows} />
    </Box>
  )
}

const cols: GridColList = [
  { field: 'id', headerName: '編號', width: 150 },
  { field: 'district', headerName: '行政區', width: 150 },
  { field: 'voltage', headerName: '瓦特數', width: 150 },
  { field: 'address', headerName: '地址', width: 300 },
  {
    field: 'coord',
    headerName: '座標',
    width: 300,
    flex: 1,
    actionType: 'button',
  },
]

const rows = [
  {
    id: '1',
    district: '大安區',
    voltage: '110',
    address: '台北市大安區復興南路一段390號',
  },
  {
    id: '2',
    district: '大安區',
    voltage: '110',
    address: '台北市大安區復興南路一段392號',
  },
]

export default Home
