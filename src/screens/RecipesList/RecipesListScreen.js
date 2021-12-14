import React, {useEffect, useLayoutEffect, useState} from "react";
import {FlatList, Text, View, TouchableHighlight, Image, ActivityIndicator} from "react-native";
import styles from "./styles";
import { getRecipes } from "../../data/MockDataAPI";
import axios from "axios";
import {baseApi} from "../../data/apiCall";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${baseApi}/posts?category_id=${item.id}`)
        .then(({ data }) => {
          setData(data.data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  /*const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };*/

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgb(183 183 183 / 90%)" /*onPress={() => onPressRecipe(item)}*/>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.price} ₺</Text>
        {/*<Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>*/}
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} />
      )}
    </View>
  );
}
