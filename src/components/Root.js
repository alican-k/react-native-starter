import React from 'react'
import { ActivityIndicator, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { compose, branch, withHandlers, renderComponent } from 'recompose'
import { mainInObj, isFetchStatusNone, isFetchStatusFetching, isFetchStatusError } from '../helpers/state'
import { quoteRequest } from '../actions'

const None = ({ _quoteRequest }) => <Button title='Fetch a Random Quote' onPress={_quoteRequest} />

const Fetching = () => <ActivityIndicator />

const Error = ({ _quoteRequest }) => [
	<Button key='button' title='Refresh Quote' onPress={_quoteRequest} />,
	<Text key='error' style={styles.quote}>Error occured, try again..</Text>
]

const Fetched = ({ main, _quoteRequest }) => [
	<Button key='button' title='Refresh Quote' onPress={_quoteRequest} />,
	<Text key='quote' style={styles.quote}>{main.quote}</Text>,
	<Text key='author' style={styles.author}>{main.author}</Text>,
]

const FetchStatusBranch = compose(
	connect(mainInObj, { quoteRequest }),
	withHandlers({
		_quoteRequest: ({ quoteRequest }) => () => quoteRequest()
	}),
	branch(isFetchStatusNone, renderComponent(None)),
	branch(isFetchStatusFetching, renderComponent(Fetching)),
	branch(isFetchStatusError, renderComponent(Error)),	
)(Fetched)

const Root = () => 
	<View style={styles.container}>
		<FetchStatusBranch />
	</View>




export default Root


// const Root = ({ main, _quoteRequest }) => 
// 	<View style={styles.container}>

// 		{ main.fetchStatus === 'NONE' &&
// 			<Button title='Fetch a Random Quote' onPress={_quoteRequest} /> }

// 		{ main.fetchStatus === 'FETCHING' &&
// 			<ActivityIndicator /> }
		
// 		{ main.fetchStatus === 'FETCHED' &&
// 			<View style={styles.container}>
// 				<Button title='Refresh Quote' onPress={_quoteRequest} />
// 				<Text style={styles.quote}>{main.quote}</Text>
// 				<Text style={styles.author}>{main.author}</Text>
// 			</View> }

// 		{ main.fetchStatus === 'ERROR' &&
// 			<View style={styles.container}>
// 				<Button title='Refresh Quote' onPress={_quoteRequest} />
// 				<Text style={styles.quote}>Error occured, try again..</Text>
// 			</View> }
// 	</View>

// export default compose(
// 	connect(mainInObj, { quoteRequest }),
// 	withHandlers({
// 		_quoteRequest: ({ quoteRequest }) => () => quoteRequest()
// 	}),
// )(Root)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	quote: {
		margin: 20,
		textAlign: 'center'
	},
	author: {
		marginTop: 20,
		fontStyle: 'italic'
	},
	
})
