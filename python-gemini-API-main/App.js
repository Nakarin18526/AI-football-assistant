import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, Image, 
  TouchableOpacity, SafeAreaView, TextInput, 
  StatusBar, Alert, FlatList, Dimensions 
} from 'react-native';
import { 
  ShoppingCart, Search, Heart, Star, 
  Menu, Bell, Filter, Crown 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PRODUCTS = [
  { id: '1', name: 'Premium Mechanical RGB', price: 5900, rating: 4.9, brand: 'LUXURY SERIES', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500' },
  { id: '2', name: 'Golden Wireless Mouse', price: 3500, rating: 4.7, brand: 'ELITE GEAR', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
  { id: '3', name: 'Pro Gaming Headset', price: 4200, rating: 4.8, brand: 'SOUND MASTER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { id: '4', name: 'Curved Monitor 4K', price: 18900, rating: 4.6, brand: 'ULTRA VISION', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
];

const CATEGORIES = ['All Products', 'Keyboard', 'Mouse', 'Headset', 'Monitor'];

export default function App() {

  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollRef = useRef();

  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    Alert.alert("Luxury Store", `เพิ่ม ${product.name} เข้าตะกร้าแล้ว`);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // 🔎 Filter Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'All Products' ||
      product.name.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchSearch && matchCategory;
  });

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <TouchableOpacity 
        style={styles.favoriteBtn} 
        onPress={() => toggleFavorite(item.id)}
      >
        <Heart 
          size={18} 
          color={favorites.includes(item.id) ? "#D4AF37" : "#FFF"} 
          fill={favorites.includes(item.id) ? "#D4AF37" : "transparent"} 
        />
      </TouchableOpacity>

      <View style={styles.cardInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>

        <View style={styles.ratingRow}>
          <Star size={12} color="#D4AF37" fill="#D4AF37" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>฿{item.price.toLocaleString()}</Text>
          <TouchableOpacity 
            style={styles.addBtn} 
            onPress={() => addToCart(item)}
          >
            <ShoppingCart color="#121212" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Menu color="#dbb22a" size={24} />
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <Crown color="#f0ede2" size={20} />
          <Text style={styles.logoText}>GOLDEN SHOP</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            style={styles.headerBtn}
            onPress={() => Alert.alert("Notifications", "ไม่มีแจ้งเตือนใหม่")}
          >
            <Bell color="#b6962d" size={24} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.headerBtn, { marginLeft: 12 }]}
            onPress={() => Alert.alert("Cart", `สินค้าในตะกร้า ${cartCount} ชิ้น`)}
          >
            <ShoppingCart color="#D4AF37" size={24} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Drawer Menu */}
      {menuOpen && (
        <View style={styles.drawer}>
          <Text style={styles.drawerItem}>Profile</Text>
          <Text style={styles.drawerItem}>Orders</Text>
          <Text style={styles.drawerItem}>Logout</Text>
        </View>
      )}

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search color="#888" size={20} />
            <TextInput 
              placeholder="ค้นหา"
              placeholderTextColor="#666"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterBtn}
            onPress={() => Alert.alert("Filter", "ฟิลเตอร์กำลังพัฒนา")}
          >
            <Filter color="#121212" size={20} />
          </TouchableOpacity>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTag}>EXCLUSIVE OFFER</Text>
            <Text style={styles.bannerTitle}>THE GOLDEN COLLECTION</Text>
            <TouchableOpacity 
              style={styles.shopNowBtn}
              onPress={() => scrollRef.current.scrollTo({ y: 500, animated: true })}
            >
              <Text style={styles.shopNowText}>DISCOVER NOW</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600' }} 
            style={styles.bannerImage} 
          />
        </View>

        {/* CATEGORY */}
        <Text style={styles.sectionTitle}>CATEGORIES</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.catBadge,
                selectedCategory === cat && styles.catBadgeActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.catText,
                selectedCategory === cat && styles.catTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* PRODUCTS */}
        <Text style={styles.sectionTitle}>BEST SELLERS</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerBtn: { backgroundColor: '#1E1E1E', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#D4AF37' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { color: '#D4AF37', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#ff4444', borderRadius: 10, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  drawer: { position: 'absolute', top: 80, left: 20, right: 20, backgroundColor: '#1E1E1E', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#D4AF37', zIndex: 99 },
  drawerItem: { color: '#D4AF37', marginBottom: 10 },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 25 },
  searchBox: { flex: 1, flexDirection: 'row', backgroundColor: '#1E1E1E', paddingHorizontal: 15, borderRadius: 15, alignItems: 'center', height: 55 },
  input: { flex: 1, marginLeft: 10, color: '#FFF' },
  filterBtn: { backgroundColor: '#D4AF37', marginLeft: 12, width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  banner: { marginHorizontal: 20, backgroundColor: '#1E1E1E', borderRadius: 25, height: 180, overflow: 'hidden', marginBottom: 30 },
  bannerImage: { width: '100%', height: '100%', position: 'absolute', opacity: 0.4 },
  bannerOverlay: { flex: 1, padding: 25, justifyContent: 'center', zIndex: 1 },
  bannerTag: { color: '#D4AF37', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  shopNowBtn: { backgroundColor: '#D4AF37', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-start', marginTop: 15 },
  shopNowText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#D4AF37', marginLeft: 20, marginBottom: 15 },
  categoryList: { paddingLeft: 20, marginBottom: 30 },
  catBadge: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#1E1E1E', borderRadius: 12, marginRight: 10 },
  catBadgeActive: { backgroundColor: '#D4AF37' },
  catText: { color: '#888', fontWeight: 'bold', fontSize: 12 },
  catTextActive: { color: '#121212' },
  grid: { paddingHorizontal: 10 },
  card: { backgroundColor: '#1E1E1E', width: width * 0.44, marginHorizontal: width * 0.02, borderRadius: 20, marginBottom: 20 },
  productImage: { width: '100%', height: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  favoriteBtn: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 12 },
  cardInfo: { padding: 15 },
  brandText: { fontSize: 9, color: '#D4AF37', fontWeight: 'bold', marginBottom: 5 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  ratingText: { fontSize: 11, color: '#888', marginLeft: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  addBtn: { backgroundColor: '#D4AF37', padding: 10, borderRadius: 12 },
});