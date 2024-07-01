import { Button, Result } from 'antd'
import React from 'react'
import style from './error-fallback.module.css'

export default function ErrorFallback({
  error,
  resetErrorBoundary
}: ErrorFallbackProps) {
  return (
    <div className={style['error-fallback-wrapper']}>
      <Result
        status="error"
        title="Something went wrong"
        subTitle={error.message}
        extra={
          <Button type="primary" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        }
      />
    </div>
  )
}
