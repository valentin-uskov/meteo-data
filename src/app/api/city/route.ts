import { NextResponse } from 'next/server'
import { cities } from './cities'

export const GET = async () => {
  return NextResponse.json(cities)
}
