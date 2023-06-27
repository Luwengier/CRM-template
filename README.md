## Features

---

### [Formik form](https://formik.org/)

Formik 與各式 MUI input 結合後的組件，該組件 _props_ 的必填一定包含：

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
    { name: 'option 2', id: '2' }
  ]}
/>
```

---

### [SWR](https://swr.vercel.app/)

預設定好 SWR Provider，可於 SWRConfig 中修改如：revalidate、refresh、retry 等的配置，並可於 fetcher 中設定接收到的 params 與預處理 response。能直接使用套件的 **useSWR** hook 來發送請求，並取得資料。

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

Notistack 套件集合 MUI Alert component，並設置好 **enqueueSuccess** 及 **enqueueError** 兩個 utils 可直接使用，也可使用套件原有的 _enqueueSnackbar_ 方法。已上好樣式的 Alert component 也可單獨在頁面上的當作提示使用。

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

Data Grid 為 MUI 的表格套件，將其封裝成 **GenericTable** 組件，並且提供 **useTableState** hook 來處理需傳入表格的 _props_，並可依照是否傳入指定 _props_ 來改變表格擁有的功能，包含：分頁大小與頁數、勾選以選取列、搜尋與排序互動框 等（例如 傳入 _selectionRows_ 與 _setSelectionRows_ 兩個狀態則使表格每列左側出現勾選框，賦予其擁有勾選列的能力）。

GenericTable 組件的 _props_ 有兩個必填：

- **columns** - 定義表格各個直行的資料類型與顯示方式。
- **rows** - 定義表格所有列的資料。

`欄位變更顯示方式：`

> 其中 columns 中包含 **_cellType_** 這個可選屬性，其可以用字串將該直行底下所有欄位的切換成各式各樣的欄位顯示方式，使用步驟為：
>
> 1. 在使用 GenericTable 的頁面中，在傳入 _columns_ 的變數中將想將切換顯示方式的 column 中加入 cellType 屬性。
>    ```ts
>      { field: 'district', headerName: '行政區', width: 150, cellType: 'tag' }
>    ```
> 2. 在 features/table/type.ts 的 `GridRowModel` 中加入可選項的鍵質對，鍵為剛才 column 的 field，值為 `CellFormat` 中的該 cellType 值。
>    ```tsx
>    export interface GridRowModel extends GridValidRowModel {
>      id: string | number
>      district?: CellFormat<'tag'>
>    }
>    ```
> 3. 回到使用 GenericTable 的頁面中，即可依照 IDE 的提示將 rows 變數中該欄位改成正確的格式。
>    ```tsx
>    const rows: GridRowModel[] = [
>      {
>        id: '1',
>        address: '台北市大安區復興南路一段390號',
>        district: [
>          {
>            id: 't1',
>            name: '大安區',
>          },
>        ],
>      },
>      // ...
>    ]
>    ```
>    ***

`範例：`

```tsx
// pages/Home/index.tsx
import {
  GenericTable,
  GridColList,
  GridRowModel,
  useTableState,
  // useTableQueryState,
} from 'features/table'

const Home = () => {
  // 可改用 useTableQueryState 進而使表格搜尋參數與頁數等狀態可與網址搜尋參數互動
  const tableProps = useTableState()
  const { selectionRows, setSelectionRows, ...rest } = useTableState()
  return (
    <div>
      {/* 擁有全部功能的 Table */}
      <GenericTable {...tableProps} columns={cols} rows={rows} />
      {/* 沒有選取框功能的 Table */}
      <GenericTable {...rest} columns={cols} rows={rows} />
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
    address: '台北市大安區復興南路一段390號',
    district: [
      {
        id: 't1',
        name: '大安區',
      },
    ],
  },
  {
    id: '2',
    address: '台北市大安區復興南路一段392號',
    district: [
      {
        id: 't1',
        name: '大安區',
      },
    ],
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
