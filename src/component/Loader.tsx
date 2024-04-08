import {
    ActivityIndicator,
    Modal,
    View
} from 'react-native';
import React from 'react';

interface LoaderProps {
    visible: boolean,
}

const Loader = ({ visible }: LoaderProps) => {
    return (
        <Modal visible={visible} transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: 80, height: 80, borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <ActivityIndicator
                        size={'large'}
                        color={'black'}
                    />
                </View>
            </View>
        </Modal>
    )
}


export default Loader