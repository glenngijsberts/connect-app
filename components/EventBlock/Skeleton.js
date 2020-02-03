import React from 'react'
import PropTypes from 'prop-types'
import SkeletonContent from 'react-native-skeleton-content'
import { View } from 'react-native'

const EventBlockSkeleton = ({ skeletons }) =>
  skeletons.map((s) => (
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
      ></SkeletonContent>
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
      ></SkeletonContent>
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
  ))

EventBlockSkeleton.defaultProps = {
  skeletons: [],
}

EventBlockSkeleton.propTypes = {
  skeletons: PropTypes.array,
}

export default EventBlockSkeleton
