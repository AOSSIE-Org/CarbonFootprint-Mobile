import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Image,
	StatusBar,
	TouchableHighlight,
	Alert,
	Linking,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
	aossieTitle,
	aossieDescription,
	appDescription
} from '../config/constants';
import Header from '../components/Header';
import images from '../config/images';
const { width, height } = Dimensions.get('window');
const About = () => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<Header icon={true} iconName="arrow-back" text="About Us" />
				<View style={styles.main}>
					<Image source={images.aossie} style={styles.image} />
					<Text style={styles.title}>{aossieTitle}</Text>
					<Text style={styles.description}>{aossieDescription}</Text>
					<View style={styles.divider} />
					<Image source={images.logo} style={styles.image} />
					<Text style={styles.large}>Carbon Footprint</Text>
					<View style={styles.text}>
						<View>
							<Text style={styles.small}>{appDescription}</Text>
						</View>
					</View>
					<View style={styles.divider} />
					<Text style={styles.title}>
						Follow us and contribute to our project!
					</Text>
					<View style={styles.social}>
						<TouchableOpacity
							onPress={() =>
								Linking.openURL(
									'https://gitlab.com/aossie/CarbonFootprint-Mobile'
								)
							}
						>
							<Image
								style={styles.socialItem}
								resizeMethod="resize"
								source={images.gitlab}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								Linking.openURL(
									'https://groups.google.com/forum/#!forum/aossie-gsoc-2017'
								)
							}
						>
							<Image
								style={styles.socialItem}
								resizeMethod="resize"
								source={images.gsoc}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => Linking.openURL('https://twitter.com/aossie_org')}
						>
							<Image
								style={styles.socialItem}
								resizeMethod="resize"
								source={images.twitter}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => Linking.openURL('https://aossie.gitlab.io/')}
						>
							<Image
								style={styles.socialItem}
								resizeMethod="resize"
								source={images.webiste}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);

	const calcMethod = () => {
		Alert.alert(
			'co2 calculation method',
			'Present formula for calculating co2 emission is: emitted co2 (in kg) = co2 emission rate of fuel (in kg/L) * (traveled distance (in km) / mileage of vehicle (in km/L)). If activity is IN_VEHICLE, co2 calculated by above formula becomes Emitted co2 and Saved co2 is 0. If activity is WALKING, ON_BICYCLE etc., co2 calculated by above formula becomes Saved co2 and Emitted co2 is 0.',
			[
				{
					text: 'OK'
				}
			],
			{ cancelable: true }
		);
	};
};

//StyleSheet
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight
	},
	main: {
		alignItems: 'center',
		marginTop: 65, // (45 + 20)
		padding: 13
	},
	image: {
		width: 120,
		height: 120
	},
	large: {
		letterSpacing: 2,
		fontSize: 20,
		marginTop: 10
	},
	small: {
		fontSize: 15,
		padding: 13,
		textAlign: 'center'
	},
	text: {
		marginTop: 10
	},
	blueText: {
		color: 'blue'
	},
	title: {
		fontSize: 18,
		margin: 8,
		marginBottom: height / 38,
		textAlign: 'center'
	},
	description: {
		marginHorizontal: width / 16,
		marginBottom: height / 38,
		fontSize: 15,
		textAlign: 'center'
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: 'green',
		width: 350
	},
	socialItem: {
		height: 80,
		width: 80
	},
	social: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: height / 40,
		paddingTop: 0
	}
});

//making About Container Available to other parts of App
export default About;
