import React from 'react'
import PropTypes from 'prop-types'
import SkeletonContent from 'react-native-skeleton-content'
import { View } from 'react-native'
import Layout from '../../theme/Layout'

const EventBlockSkeleton = ({ skeletons }) => (
  <View
    style={{
      paddingTop: 16,
    }}
  >
    <SkeletonContent
      containerStyle={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      isLoading={true}
      layout={[
        {
          key: `sponsored-1`,
          width: Layout.gridWidth,
          height: 180,
          marginBottom: 16,
        },
      ]}
    />
    {skeletons.map((s) => (
      <View style={{ marginBottom: 16 }} key={s}>
        <SkeletonContent
          containerStyle={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          isLoading={true}
          layout={[
            {
              key: `${s}-1`,
              width: 200,
              height: 20,
              marginBottom: 6,
            },
            {
              key: `${s}-2`,
              width: 80,
              height: 80,
              marginBottom: 6,
            },
          ]}
        />
        <SkeletonContent
          containerStyle={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          isLoading={true}
          layout={[
            {
              key: `${s}-3`,
              width: 200,
              height: 20,
              marginTop: -56,
            },
          ]}
        />
        <SkeletonContent
          containerStyle={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          isLoading={true}
          layout={[
            {
              key: `${s}-4`,
              width: 200,
              height: 20,
              marginTop: -24,
            },
          ]}
        />
      </View>
    ))}
  </View>
)

EventBlockSkeleton.defaultProps = {
  skeletons: [],
}

EventBlockSkeleton.propTypes = {
  skeletons: PropTypes.array,
}

export default EventBlockSkeleton
