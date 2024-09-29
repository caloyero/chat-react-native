import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const ScrollItems = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`https://randomuser.me/api/?page=${page}&results=10`);
    const data = await response.json();
    setUsers(prevUsers => [...prevUsers, ...data.results]);
    setLoading(false);
    setPage(prevPage => prevPage + 1);
  };

  const renderFooter = () => {
    return (
      loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name.first}</Text>
          </View>
        )}
        onEndReached={fetchUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loader: {
    marginVertical: 20,
  },
});

export default ScrollItems;
