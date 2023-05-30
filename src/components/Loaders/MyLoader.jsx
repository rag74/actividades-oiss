import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
  speed={1}
  width={360}
  height={150}
  viewBox="0 0 360 140"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  {...props}
>
  <rect x="18" y="42" rx="5" ry="5" width="320" height="25" /> 
  <rect x="58" y="76" rx="5" ry="5" width="232" height="25" /> 
  <circle cx="150" cy="129" r="2" /> 
  <rect x="58" y="109" rx="5" ry="5" width="232" height="25" /> 
  <rect x="7" y="5" rx="5" ry="5" width="345" height="25" />
  </ContentLoader>
)

export default MyLoader