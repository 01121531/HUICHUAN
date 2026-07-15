/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

export interface EmptyStateProps {
  searchQuery?: string
  catalogEmpty?: boolean
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function EmptyState(props: EmptyStateProps) {
  const { t } = useTranslation()
  const hasSearch = Boolean(props.searchQuery?.trim())
  let description = t('No models match your current filters.')

  if (props.catalogEmpty) {
    description = t(
      'Models will appear here after they are enabled by the administrator.'
    )
  } else if (hasSearch) {
    description = t(
      'No results for "{{query}}". Try adjusting your search or filters.',
      { query: props.searchQuery }
    )
  }

  return (
    <div className='border-border/60 bg-card/45 relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed px-6 py-12 text-center shadow-sm backdrop-blur-sm'>
      <div
        aria-hidden='true'
        className='absolute top-1/2 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-3xl'
      />
      <span className='bg-muted relative mb-4 flex size-14 items-center justify-center rounded-2xl'>
        <Search className='text-muted-foreground/50 size-7' />
      </span>

      <h3 className='text-foreground relative mb-1 text-lg font-semibold'>
        {props.catalogEmpty ? t('No models available') : t('No models found')}
      </h3>

      <p className='text-muted-foreground relative mb-5 max-w-sm text-sm leading-6'>
        {description}
      </p>

      {(props.hasActiveFilters || hasSearch) && (
        <Button
          variant='outline'
          size='sm'
          className='relative'
          onClick={props.onClearFilters}
        >
          {t('Clear all filters')}
        </Button>
      )}
    </div>
  )
}
