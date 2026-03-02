import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Format số điện thoại
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);

    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;

    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  };

  // Hàm kiểm tra định dạng
  const isValidPhone = (rawPhone) => {
    const regex = /^0\d{9}$/;
    return regex.test(rawPhone);
  };

  // Khi nhập → chỉ format, không validate
  const handleChangeText = (value) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
  };

  // Khi bấm nút
  const handleConfirm = () => {
    const raw = phone.replace(/\s/g, '');

    if (raw === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }

    if (!isValidPhone(raw)) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      Alert.alert('', 'Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      return;
    }

    // Nếu đúng
    setError('');
    Alert.alert('Thành công', 'Số điện thoại hợp lệ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <Text style={styles.note}>
        * Số điện thoại gồm 10 chữ số, bắt đầu bằng 0
      </Text>

      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        style={[
          styles.input,
          error ? styles.inputError : null
        ]}
        value={phone}
        onChangeText={handleChangeText}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirm}
      >
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  desc: {
    color: '#666',
    marginVertical: 10,
  },
  note: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: '#999',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 14,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
