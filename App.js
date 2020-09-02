import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text_name: '',
      text_email: '',
      ds: [],
      isLoading: true,
      refresh: '',
    };
  }

  componentDidMount() {
    fetch('https://***.herokuapp.com/index.php')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ ds: json });
        console.log('it works');
        console.log(json);
        // this.state.ds 
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  // postData = async (str) => {
  //   try {
  //     let res = await fetch('https://***.herokuapp.com/create.php', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: this.state.text_name,
  //         email: this.state.text_email
  //       }),
  //     });
  //     // res = await res.json();
  //     console.log(res)
  //     // Alert.alert('onPress', res.json.str);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  saveData() {
    try {
      fetch('https://***.herokuapp.com/create_rn.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.text_name,
          email: this.state.text_email
        }),
      })
        .then((response) => response.text())
        .then((json) => {
          this.state.ds.push({
            'id': '10000',
            'username': this.state.text_name,
            'email': this.state.text_email
          });
          this.setState({
            refresh: !this.state.refresh,
            text_name: null,
            text_email: null
          });
          console.log(json);
          return json;
        });
      console.log('Request made.');
    } catch (e) {
      console.error(e);
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.header_footer}>

        <Text
          style={styles.title}
        >
          Test App
        </Text>

        <View style={styles.section_text_style}>
          <Text>Customer Information: </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
          <TextInput
            style={{ height: 40, width: '40%', }}
            placeholder="Name"
            onChangeText={text_name => this.setState({ text_name })}
            value={this.state.text_name}
          />

          <TextInput
            style={{ height: 40, width: '40%', }}
            placeholder="Email"
            onChangeText={text_email => this.setState({ text_email })}
            value={this.state.text_email}
          />

          <Button
            style={styles.button}
            title="Add"
            // onPress={() => Alert.alert('Data Saved!')}
            onPress={() => this.saveData()}
          />
        </View>

        {this.state.isLoading &&
          <View style={styles.loading}>
            <ActivityIndicator color="red" size="large" animating={this.state.isLoading} />
          </View>
        }
      </View>
    );
  }

  // renderRow = ({ item }) => {
  //   if (item.phoneNumbers[0] === 'undefined') {

  //   } else {
  //     return (
  //       <Text style={{ color: 'red' }}>{item.name} - {item.phoneNumbers[0].number}</Text>
  //     )
  //   }
  // };

  showItem(data) {
    Alert.alert(data);
  }

  renderListSeparator = () => {
    return (
      <View style={styles.list_separator} />
    );
  }

  renderFooter = () => {
    return (
      <View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ds}
          extraData={this.state.ds}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={this.renderListSeparator}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text
                style={{ height: 40, width: '30%', }}
                onPress={this.showItem.bind(this, item.username)}>
                {item.username}
              </Text>
              <Text
                style={{ height: 40, width: '70%', }}
                onPress={this.showItem.bind(this, item.email)}>
                {item.email}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list_style}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  loading: {
    marginTop: 100,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
    backgroundColor: 'black',
    width: '100%',
  },
  text_style: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
  button: {
    padding: 2,
    fontSize: 8
  },
  section_text_style: {
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    padding: 10,
    backgroundColor: "whitesmoke"
  },
  list_style: {
    width: '90%',
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  row_style: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: "50%",
  },
  list_separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#606070',
  },
  header_footer: {
    width: '100%',
  },
});
