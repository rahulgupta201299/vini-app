import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { contact, colors, radius, spacing } from '@/constants/theme';
import { BottomSheet, PrimaryButton } from '@/components/ui';

/** "Still have a doubt? Request a call back."  [Call] [Form] */
export function CallbackSection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const phoneValid = /^[6-9]\d{9}$/.test(phone);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setName('');
      setPhone('');
    }, 300);
  };

  // TODO: send { name, phone } to your backend / CRM here
  const submit = () => setSent(true);

  return (
    <View style={styles.wrap}>
      <LinearGradient colors={['#FFF0F3', '#FFFFFF']} style={styles.card}>
        <View style={styles.illustration}>
          <View style={styles.head}>
            <MaterialCommunityIcons name="face-agent" size={44} color={colors.primary} />
          </View>
          <View style={styles.body} />
        </View>

        <Text style={styles.title}>Still have a doubt?</Text>
        <Text style={styles.subtitle}>Request a call back from our expert counsellors</Text>
        <Text style={styles.hours}>
          <Ionicons name="time-outline" size={12} color={colors.muted} /> {contact.hours}
        </Text>

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [styles.btn, styles.callBtn, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(`tel:${contact.phone}`)}
          >
            <Ionicons name="call" size={18} color="#fff" />
            <Text style={[styles.btnText, { color: '#fff' }]}>Call</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btn, styles.formBtn, pressed && { opacity: 0.85 }]}
            onPress={() => setOpen(true)}
          >
            <Ionicons name="document-text-outline" size={18} color={colors.primary} />
            <Text style={[styles.btnText, { color: colors.primary }]}>Form</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => Linking.openURL(`https://wa.me/${contact.whatsapp}`)}
          style={styles.whatsapp}
        >
          <Ionicons name="logo-whatsapp" size={16} color={colors.green} />
          <Text style={styles.whatsappText}>Or chat with us on WhatsApp</Text>
        </Pressable>
      </LinearGradient>

      <BottomSheet visible={open} onClose={close} title={sent ? 'Request received ✅' : 'Request a call back'}>
        {sent ? (
          <View style={{ gap: 16, paddingVertical: 8 }}>
            <Text style={styles.subtitle}>
              Thanks{name ? `, ${name}` : ''}! Our counsellor will call you on {phone} shortly.
            </Text>
            <PrimaryButton label="Done" onPress={close} />
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.faint}
              style={styles.input}
            />
            <View style={styles.phoneRow}>
              <Text style={styles.prefix}>+91</Text>
              <TextInput
                value={phone}
                onChangeText={(v) => setPhone(v.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit mobile number"
                placeholderTextColor={colors.faint}
                keyboardType="phone-pad"
                style={[styles.input, { flex: 1 }]}
              />
            </View>
            {phone.length > 0 && !phoneValid ? (
              <Text style={styles.error}>Please enter a valid 10-digit mobile number</Text>
            ) : null}
            <PrimaryButton label="Call Me Back" icon="call-outline" disabled={!name.trim() || !phoneValid} onPress={submit} />
          </View>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.screen },
  card: {
    borderRadius: radius.xl,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD6DE',
  },
  illustration: { alignItems: 'center', marginBottom: 14 },
  head: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  body: {
    width: 0,
    height: 0,
    marginTop: -10,
    borderLeftWidth: 34,
    borderRightWidth: 34,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
  },
  title: { fontSize: 21, fontWeight: '900', color: colors.ink },
  subtitle: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 4, lineHeight: 20 },
  hours: { fontSize: 12, color: colors.muted, marginTop: 6 },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 18, alignSelf: 'stretch' },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callBtn: { backgroundColor: colors.primary },
  formBtn: { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: '#fff' },
  btnText: { fontSize: 15.5, fontWeight: '800' },
  whatsapp: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 },
  whatsappText: { color: colors.green, fontWeight: '700', fontSize: 13 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.ink,
  },
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  prefix: {
    height: 50,
    lineHeight: 50,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
    overflow: 'hidden',
  },
  error: { color: colors.primary, fontSize: 12 },
});
