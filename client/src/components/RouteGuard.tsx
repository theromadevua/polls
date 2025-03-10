'use client'
import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'

interface RouteGuardProps {
  children: ReactNode
  requiredRole?: 'creator'
  surveyId?: string | string[]
}

export const RouteGuard: FC<RouteGuardProps> = ({ 
  children, 
  requiredRole,
  surveyId 
}) => {
  const router = useRouter()
  const { user, loading } = useSelector((state: RootState) => state.auth)
  const { surveyData, loading: loadingSurveys, error } = useSelector((state: RootState) => state.survey)

  useEffect(() => {
    if(loadingSurveys || loading) return
    if(!surveyData && !error) return
    if (requiredRole === 'creator') {
      if (surveyData.createdBy !== user?._id) {
        router.push('/main')
      }
    }
  }, [requiredRole, surveyId, user?._id, router, loadingSurveys])

  return <>{children}</>
}