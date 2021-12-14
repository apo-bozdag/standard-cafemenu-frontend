import React, {useEffect, useLayoutEffect, useState} from "react";
import { ActivityIndicator, FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import {baseApi} from "../../data/apiCall";
import axios from 'axios';

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${baseApi}/categories`)
        .then(({ data }) => {
          setData(data.data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgb(183 183 183 / 90%)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{item.total_foods} menü içeriği</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {isLoading ? <ActivityIndicator/> : (
          <FlatList data={data} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
      )}
    </View>
  );
}
