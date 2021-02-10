import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker, ProviderPropType, Geojson } from 'react-native-maps';
import xml2js from 'react-native-xml2js';

export default class App extends Component {
    state = {
        pnu: '1174011000102890016',
        epsg5174: '214919.477 451817.1720000003 214922.3140000003 451819.9100000002 214926.682 451819.6380000003 214927.034 451818.0899999999 214927.5499999998 451816.5380000006 214929.0029999996 451813.6469999999 214930.0939999996 451811.9299999997 214930.0489999997 451811.534 214938.892 451795.2310000006 214948.7649999997 451776.5610000007 214963.6500000004 451748.5830000006 214963.9189999998 451748.0769999996 214951.6799999997 451767.0869999994 214926.8310000002 451805.7650000006 214919.477 451817.1720000003x',
    };
    /*
 * https://github.com/proj4js/proj4js
 214919.477 451817.1720000003 214922.3140000003 451819.9100000002 214926.682 451819.6380000003 214927.034 451818.0899999999 214927.5499999998 451816.5380000006 214929.0029999996 451813.6469999999 214930.0939999996 451811.9299999997 214930.0489999997 451811.534 214938.892 451795.2310000006 214948.7649999997 451776.5610000007 214963.6500000004 451748.5830000006 214963.9189999998 451748.0769999996 214951.6799999997 451767.0869999994 214926.8310000002 451805.7650000006 214919.477 451817.1720000003
 */
    getGEOPolylines = () => {
        var HttpUrl = "http://openapi.nsdi.go.kr/nsdi/map/CtnlgsSpceService/wfs/getCtnlgsSpceWFS"; /*URL*/
        var parameter = '?' + encodeURIComponent("authkey") + "=" + encodeURIComponent("eae411b7596dab4020a85c"); /*authkey Key*/
        parameter += "&" + encodeURIComponent("typename") + "=" + encodeURIComponent("F6"); /* 질의 대상인 하나 이상의 피처 유형 이름의 리스트, 값은 쉼표로 구분화면 하단의 [레이어 목록] 참고 */
        parameter += "&" + encodeURIComponent("bbox") + "=" + encodeURIComponent("215107,451581,215362,451765,EPSG:5174"); /* 좌표로 이루어진 사각형 안에 담겨 있는 (또는 부분적으로 걸쳐 있는) 피처를 검색. 좌표 순서는 사용되는 좌표 시스템을 따름.일반적 표현은 하단좌표, 상단좌표, 좌표체계 순서입니다.(lc1,lc2,uc1,uc2,좌표체계) */
        parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(""); /* 필지고유번호 19자리중 최소 8자리(시도[2]+시군구[3]+읍면동[3])(입력시 bbox값은 무시) */
        parameter += "&" + encodeURIComponent("maxFeatures") + "=" + encodeURIComponent("10"); /* 요청에 대한 응답으로 WFS가 반환해야하는 피처의 최대 값(최대 허용값 : 100) */
        parameter += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent("results"); /* 요청에 대하여 WFS가 어떻게 응답할 것인지 정의.results 값은 요청된 모든 피처를 포함하는 완전한 응답이 생성되어야 함을 나타내며, hits 값은 피처의 개수만이 반환되어야 함을 의미 */
        parameter += "&" + encodeURIComponent("srsName") + "=" + encodeURIComponent("EPSG:5174"); /* 반환되어야 할 피처의 기하에 사용되어야 할 WFS가 지원하는 좌표체계 */
        var url = HttpUrl + parameter;
        console.log(url);
        this.setState(previousState => ({ epsg5174: "xxx" }));
        var component = this;
        return fetch(url).then(response => response.text())
            .then(textcontent => {
                var parser = xml2js.Parser();
                parser.parseString(textcontent, function (err, result) {
                    component.setState(previousState => ({ epsg5174: result["wfs:FeatureCollection"]["gml:featureMember"][0]["NSDI:F6"][0]["NSDI:SHAPE"][0]["gml:MultiSurface"][0]["gml:surfaceMember"][0]["gml:Polygon"][0]["gml:exterior"][0]["gml:LinearRing"][0]["gml:posList"][0] }));
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} initialRegion={myPlace.initialRegion}>
                    <Geojson geojson={myPlace} />
                </MapView>
                <Text>PNU</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="PNU를 입력하세요."
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    value={this.state.pnu}
                />
                <Button onPress={this.getGEOPolylines} title="Get the Coordinate number " style={styles.submitbutton}></Button>
                <TextInput style={styles.input} value={this.state.epsg5174} ></TextInput>
                <Button title="Convert EPSG:5174 To EPSG:4326 WGS 84" style={styles.submitbutton}></Button>
            </View>
        );
    }
}

const myPlace = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [128.7870343, 35.4508677],
            },
        },
    ],
    initialRegion: {
        longitude: 128.7870343,
        latitude: 35.4508677,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    input: {
        margin: 5,
        height: 40,
        padding: 5,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitbutton: {
        width: 500
    }
});
