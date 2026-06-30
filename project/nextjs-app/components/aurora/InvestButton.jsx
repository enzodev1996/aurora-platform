'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import InvestModal from './InvestModal'

/**
 * @param {{ project: string }} props
 */
export default function InvestButton({ project }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="accent" full style={{ marginTop: 6 }} onClick={() => setOpen(true)}>
        Invest now
      </Button>
      <InvestModal project={project} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
