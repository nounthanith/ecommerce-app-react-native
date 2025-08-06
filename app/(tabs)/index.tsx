import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface Product {
  0: number;     // id
  1: string;     // name
  2: string;     // imageUrl
  3: number;     // price
  4: string;     // brand
  5: string;     // description
  6: number;     // rating
  7: number;     // stock
  8: string;     // dateAdded
}

export default function Index() {
  const api = "https://script.google.com/macros/s/AKfycbwVhhpVvWoaMYP4Ecz8D_EqeRcrKlS_uberQeHTx1VJu2EzOvhgtT2I3e2A8vHXAhKY/exec";

  const [data, setData] = useState<{data: Product[]}>({data: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}?action=read`);
        const result = await response.json();
        setData(result);
        // console.log(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <MaterialIcons 
        key={i} 
        name={i < Math.floor(rating) ? 'star' : 'star-border'} 
        size={16} 
        color="#FFD700" 
      />
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#ff4444" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header}>PICH-Ecommerce</Text>
      
      <View style={styles.productsContainer}>
        {data.data.map((item, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.imageContainer}>
              {item[2] ? (
                <Image 
                  source={{ uri: item[2] }} 
                  style={styles.productImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.noImage}>
                  <MaterialIcons name="image-not-supported" size={40} color="#888" />
                </View>
              )}
              {item[7] < 5 && (
                <View style={styles.lowStockBadge}>
                  <Text style={styles.lowStockText}>Only {item[7]} left</Text>
                </View>
              )}
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.brand}>{item[4]}</Text>
              <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
                {item[1]}
              </Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {renderStars(item[6])}
                </View>
                <Text style={styles.ratingText}>({item[6]})</Text>
              </View>
              
              <Text style={styles.price}>${item[3].toFixed(2)}</Text>
              
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 8,
    color: '#7C3AED',
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#7C3AED',
    textShadowColor: '#7C3AED',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    // textShadowOpacity: 0.5, 
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
  },
  lowStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lowStockText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  productInfo: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6c757d',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
  },
});
