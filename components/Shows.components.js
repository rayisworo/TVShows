import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import HTML from 'react-native-render-html';
import test from '../fixtures/tvshows.json';

export default class Shows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      details: {
        score: 18.536875,
        show: {
          id: 171,
          url: 'https://www.tvmaze.com/shows/171/how-i-met-your-mother',
          name: 'How I Met Your Mother',
          type: 'Scripted',
          language: 'English',
          genres: ['Drama', 'Comedy', 'Romance'],
          status: 'Ended',
          runtime: 30,
          averageRuntime: 30,
          premiered: '2005-09-19',
          officialSite: 'http://www.cbs.com/shows/how_i_met_your_mother',
          schedule: {
            time: '20:00',
            days: ['Monday'],
          },
          rating: {
            average: 7.9,
          },
          weight: 94,
          network: {
            id: 2,
            name: 'CBS',
            country: {
              name: 'United States',
              code: 'US',
              timezone: 'America/New_York',
            },
          },
          webChannel: null,
          dvdCountry: null,
          externals: {
            tvrage: 3918,
            thetvdb: 75760,
            imdb: 'tt0460649',
          },
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/0/2451.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/0/2451.jpg',
          },
          summary:
            "<p><b>How I Met Your Mother</b> is a comedy about Ted and how he fell in love. It all starts when Ted's best friend, Marshall drops the bombshell that he's going to propose to his long-time girlfriend, Lilya kindergarten teacher. At that moment, Ted realizes that he had better get a move on if he too hopes to find true love. Helping him in his quest is Barney a friend with endless, sometimes outrageous opinions, a penchant for suits and a foolproof way to meet women. When Ted meets Robin he's sure it's love at first sight, but destiny may have something else in store.</p>",
          updated: 1619085621,
          _links: {
            self: {
              href: 'https://api.tvmaze.com/shows/171',
            },
            previousepisode: {
              href: 'https://api.tvmaze.com/episodes/12492',
            },
          },
        },
      },
    };
  }
  handleChoose = item => {
    this.setState({showDetails: true, details: item});
    console.log(item);
  };
  itemRender = ({item, index}) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.cardTab}
          onPress={() => this.handleChoose(item)}>
          <View style={styles.titleTab}>
            <Image
              source={{
                uri: item.show.image ? item.show.image.medium : '',
              }}
              style={styles.productImage}
            />
            <Text style={styles.txtNamaProduk}>{item.show.name}</Text>

            <Text style={styles.txtrating}>
              Rating : {item.show.rating.average}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  listEmptyComponent = () => {
    return (
      <View style={styles.baseCard}>
        <TouchableOpacity style={styles.cardTab}>
          <View style={styles.titleTab}>
            <Text style={styles.txtNamaProduk}>No Result</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const showDetails = this.state.details;
    const htmlContent = showDetails == {} ? '' : showDetails.show.summary;
    const contentWidth = Dimensions.get('window').width;
    return (
      <SafeAreaView>
        {!this.state.showDetails ? (
          <>
            <Text style={styles.pageTitle}>
              Search Result For {this.props.search}
            </Text>
            <FlatList
              data={this.props.shows}
              ListEmptyComponent={this.listEmptyComponent()}
              renderItem={this.itemRender}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        ) : (
          <View style={styles.detailsCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{
                  uri: showDetails.show.image.medium,
                }}
                style={styles.detailsImage}
              />
              <Text style={styles.detailsTitle}>{showDetails.show.name}</Text>
              <View style={styles.detailsDescription}>
                <HTML
                  source={{html: htmlContent}}
                  contentWidth={contentWidth}
                />
                <Text>Runtime : {showDetails.show.runtime}</Text>
                <Text>Rating : {showDetails.show.rating.average}</Text>
                <Text>Premiere : {showDetails.show.premiered}</Text>
                <Text>
                  Schedule : {showDetails.show.schedule.days},{' '}
                  {showDetails.show.schedule.time}
                </Text>
                <Text
                  style={{color: 'blue'}}
                  onPress={() =>
                    Linking.openURL(
                      'https://www.imdb.com/title/' +
                        showDetails.show.externals.imdb,
                    )
                  }>
                  IMDB
                </Text>
                <Text
                  style={{color: 'blue'}}
                  onPress={() => Linking.openURL(showDetails.show.url)}>
                  tvmaze
                </Text>
                <Text
                  style={{color: 'blue'}}
                  onPress={() =>
                    Linking.openURL(showDetails.show.officialSite)
                  }>
                  Official Site
                </Text>
                <Text
                  style={{color: 'blue'}}
                  onPress={() =>
                    Linking.openURL(showDetails.show._links.nextepisode.href)
                  }>
                  Next Episode
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  detailsCard: {
    margin: 15,
  },
  detailsDescription: {
    margin: 5,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    elevation: 3,
  },
  detailsImage: {
    height: 250,
    resizeMode: 'contain',
  },
  detailsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    // marginLeft: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 15,
    marginTop: 10,
  },
  baseCard: {
    backgroundColor: 'blue',
    marginRight: 18,
    marginLeft: 18,
    marginTop: 15,
  },
  cardTab: {
    backgroundColor: 'blue',
    marginRight: 18,
    marginLeft: 18,
    marginTop: 15,
    alignItems: 'center',
    padding: 15,
    paddingBottom: 30,
    borderWidth: 0.1,
    borderRadius: 10,
    height: 215,
    backgroundColor: 'white',
  },
  productImage: {
    margin: -5,
    height: 150,
    resizeMode: 'contain',
  },
  titleTab: {
    flexDirection: 'column',
  },
  txtNamaProduk: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  txtrating: {
    fontSize: 13,
    marginLeft: 6,
    marginRight: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
});
