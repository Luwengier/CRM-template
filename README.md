## Features

---

### [Formik form](https://formik.org/)

Formik 與各式 MUI input 結合後的組件，該組件的 _Props_ 的必填一定包含：

- **formik** - useFormik 回傳的實例。
- **name** - 與一般 input element 的 name 相同。

部分有選項的組件，如 Autocomplete、Select 等，會有 options 也為必填：

- **options** - 定義下拉式選單選項的資料陣列。

```tsx
// 用例：
const formik = useFormik({...})

<FormikTagAutocomplete
  name="account"
  formik={formik}
  options={[
    { name: 'option 1', id: '1' },
    { name: 'option 2', id: '1' }
  ]}
/>
```

---

### [SWR](https://swr.vercel.app/)

預設定好 SWR Provider，可於 **SWRConfig** 中設定 _revalidate、refresh_ 與 _retry_ 等配置，可於 **fetcher** 中設定接收到的 params 與預處理 response。

```tsx
// 用例：
const { data, isLoading, error } = useSWR('your/api/path')

// OR //
const { data, isLoading, error } = useSWR([
  'your/api/path',
  { page: 3, limit: 20 },
])
```

---

### [Notification](https://notistack.com/)

Notistack 套件集合 MUI Alert component，並設置好 **enqueueSuccess** 及 **enqueueError** 兩個 utils 可直接使用，也可使用套件原有的 _enqueueSnackbar_ 方法。好樣式的 Alert component 也可單獨在頁面上的當作提示使用。

```tsx
// 用例：
import { enqueueSuccess, enqueueError } from 'utils/notify'
import { enqueueSnackbar } from 'notistack'

try {
  enqueueSuccess('修改成功')
} catch (error) {
  enqueueError(error)
}

// OR //
enqueueSnackbar('一些注意事項', {
  variant: 'warning',
})
```

---

### [Table(Data Grid)](https://mui.com/x/react-data-grid/)

```tsx
// pages/Home/index.tsx
import {
  GenericTable,
  GridColList,
  GridRowModel,
  useTableQueryState,
} from 'features/table'

const Home = () => {
  const tableProps = useTableQueryState()
  return (
    <div>
      <GenericTable {...tableProps} columns={cols} rowData={rows} />
    </div>
  )
}

const cols: GridColList = [
  { field: 'id', headerName: '編號', width: 150 },
  { field: 'district', headerName: '行政區', width: 150, cellType: 'tag' },
  { field: 'address', headerName: '地址', minWidth: 300, flex: 1 },
]

const rows: GridRowModel[] = [
  {
    id: '1',
    district: '大安區',
    address: '台北市大安區復興南路一段390號',
  },
  {
    id: '2',
    district: '大安區',
    address: '台北市大安區復興南路一段392號',
  },
]
```

```ts
// features/table/type.ts
export interface GridRowModel extends GridValidRowModel {
  id: string | number
  district?: CellFormat['tag']
}

interface CellFormat {
  //...
}
```

---
