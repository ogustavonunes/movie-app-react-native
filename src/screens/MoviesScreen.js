import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";

export default function MoviesScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://reactnative.dev/movies.json"
      );

      const json = await response.json();

      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🎞️ Lista de Filmes
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.movieTitle}>
                {item.title}
              </Text>

              <Text style={styles.movieYear}>
                Ano: {item.releaseYear}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  movieTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  movieYear: {
    color: "#bbb",
    marginTop: 5,
    fontSize: 16,
  },
});