import React from 'react'
import { connect } from 'react-redux'
import { convertRLEToSVG } from '../utilities/convertRLEToSVG'

const renderList = (items, title) => {
  return (
    <div>
      <div>{title}</div>
      {items.map(body => {
          return (
            <div dangerouslySetInnerHTML={{
              __html: convertRLEToSVG(body)
            }} />
          )
        })}
    </div>
  )
}

const Wearables = (props) => {
  const { wearables } = props
  return (
    <div>
      {renderList(wearables.nounsBodies, 'Basic Shirts')}
      {renderList(wearables.nounsAccessories, 'Basic Accessories')}
      {renderList(wearables.nounsGlasses, 'Basic Glasses')}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    wearables: state.wearables
  }
}

export default connect(mapStateToProps)(Wearables)
