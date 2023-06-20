import { lazy, Suspense } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { ActionSelectText, ActionInputText } from './ActionText'

import { GridRowParams } from '@mui/x-data-grid'
import { GridRowModel, FullColDef } from 'features/table/type'

const ActionScript = lazy(
  () => import('features/table/components/cell/ActionScript')
)
const ActionButton = lazy(
  () => import('features/table/components/cell/ActionButton')
)
const ActionSwitch = lazy(
  () => import('features/table/components/cell/ActionSwitch')
)
const ActionCheckbox = lazy(
  () => import('features/table/components/cell/ActionCheckbox')
)
const ActionInput = lazy(
  () => import('features/table/components/cell/ActionInput')
)
const ActionSelect = lazy(
  () => import('features/table/components/cell/ActionSelect')
)
const ActionIconButton = lazy(
  () => import('features/table/components/cell/ActionIconButton')
)

const CellActionPanel = ({
  col,
  params,
  action,
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
  action?: (params: GridRowParams, curValue?: string) => void
}) => {
  switch (col.actionType) {
    case 'script':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionScript
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
          />
        </Suspense>
      )

    case 'button':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionButton
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
          />
        </Suspense>
      )

    case 'switch':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionSwitch
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
          />
        </Suspense>
      )

    case 'input':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionInput
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
          />
        </Suspense>
      )

    case 'number-input':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionInput
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            type="number"
          />
        </Suspense>
      )

    case 'input:text':
      return (
        <ActionInputText
          key={String(params.id) + String(col.field) + col.actionType}
          col={col}
          params={params}
        />
      )

    case 'select':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionSelect
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
          />
        </Suspense>
      )

    case 'select:text':
      return (
        <ActionSelectText
          key={String(params.id) + String(col.field) + col.actionType}
          col={col}
          params={params}
        />
      )

    case 'checkbox':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionCheckbox
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
          />
        </Suspense>
      )

    case 'checkbox:disabled':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionCheckbox
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
            type="disabled"
          />
        </Suspense>
      )

    case 'icon-button':
      return (
        <Suspense fallback={<CellSkeleton />}>
          <ActionIconButton
            key={String(params.id) + String(col.field) + col.actionType}
            col={col}
            params={params}
            action={action}
          />
        </Suspense>
      )

    case 'empty':
      return null

    default:
      return params.row[col.field] || null
  }
}

const CellSkeleton = () => (
  <Skeleton animation="wave" variant="rounded" width="4rem" height="1.5rem" />
)

export default CellActionPanel
