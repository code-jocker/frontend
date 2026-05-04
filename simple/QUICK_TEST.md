# Quick Test Guide - Frontend Fixed

## 🚀 Start Servers

### 1. Backend
```bash
cd C:\Users\Hp\Desktop\shyaka
npm start
```
**Expected:** `Database connected successfully💯💯💯💯💯💯💯`

### 2. Frontend
```bash
cd C:\Users\Hp\Desktop\reactjs\simple
npm run dev
```
**Expected:** `Local: http://localhost:5173/`

---

## ✅ Test Complete Flow

### Step 1: Register/Login
```
1. Go to http://localhost:5173/register
2. Fill form (uses fullName, phoneNumber - camelCase)
3. Register as "seller" type
4. Login at /login
5. ✅ Should redirect to /dashboard
```

### Step 2: Create Shop (REQUIRED FIRST)
```
1. Go to /dashboard/shops
2. Click "+ Add Shop"
3. Fill:
   - Name: "Test Shop"
   - Contact: "+250788000000"
   - Description: "My test shop"
   - Status: "active"
4. Click "Create"
5. ✅ Shop appears in list
```

### Step 3: Create Product (NOW WITH SHOP)
```
1. Go to /dashboard/products
2. Click "+ Add Product"
3. Fill:
   - Name: "Test T-Shirt"
   - Size: "M"
   - Price: 29.99
   - Description: "Nice shirt"
   - Shop: Select "Test Shop" ← NEW!
   - Type: "unisex"
   - Status: "available"
4. Click "Create"
5. ✅ Product appears with shop name shown
```

### Step 4: Create Order (NOW WITH PRODUCT)
```
1. Go to /dashboard/orders
2. Click "+ Add Order"
3. Fill:
   - Product: Select "Test T-Shirt - $29.99" ← NEW!
   - Price: 29.99 ← NEW!
   - Quantity: 2 ← NEW!
4. Click "Create"
5. ✅ Order appears with status "pending"
```

### Step 5: Approve Order
```
1. Find the pending order
2. Click green "Approve" button
3. ✅ Status changes to "confirmed"
4. ✅ Notification count increases
```

### Step 6: Check Notifications
```
1. Look at sidebar - red badge shows count
2. Go to /dashboard/notifications
3. ✅ See "Order approved" notification
4. Click "Delete" to remove it
5. ✅ Count decreases
```

---

## 🎯 What Changed

### Products Form - BEFORE vs AFTER

**BEFORE (Broken):**
```
Name: [input]
Size: [input]
Price: [input]
Type: [dropdown]
Status: [dropdown]
❌ No shop field - backend rejected!
```

**AFTER (Fixed):**
```
Name: [input]
Size: [input]
Price: [input]
Description: [input]
Shop: [dropdown] ← NEW! Shows all shops
Type: [dropdown]
Status: [dropdown]
✅ Backend accepts!
```

### Orders Form - BEFORE vs AFTER

**BEFORE (Broken):**
```
Customer: [input]
Total: [input]
Status: [dropdown]
❌ Wrong fields - backend rejected!
```

**AFTER (Fixed):**
```
Product: [dropdown] ← NEW! Shows all products
Price: [input] ← NEW!
Quantity: [input] ← NEW!
Status: [dropdown] (only when editing)
✅ Backend accepts!
```

---

## 🐛 Troubleshooting

### "Shop not found" error
**Problem:** Creating product without shop
**Solution:** Create a shop first, then select it in product form

### "prodId is required" error
**Problem:** Creating order without product
**Solution:** Create a product first, then select it in order form

### Product dropdown is empty
**Problem:** No products exist yet
**Solution:** Create products first (with shops)

### Shop dropdown is empty
**Problem:** No shops exist yet
**Solution:** Create shops first

### Order shows "Product ID: undefined"
**Problem:** Old orders created before fix
**Solution:** Delete old orders and create new ones

---

## 📋 Quick Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can register with fullName/phoneNumber
- [ ] Can login and see dashboard
- [ ] Can create shop
- [ ] Can create product (with shop selection)
- [ ] Product card shows shop name
- [ ] Can create order (with product selection)
- [ ] Order shows "Product ID" and "Price x Quantity"
- [ ] Can approve/reject pending orders
- [ ] Notification count shows in sidebar
- [ ] Can delete notifications
- [ ] All CRUD operations work

---

## 🎉 Success Indicators

### Products Page:
```
✅ Shop dropdown appears in form
✅ Product cards show "🏪 Shop Name"
✅ Can create product successfully
✅ Backend receives shopName field
```

### Orders Page:
```
✅ Product dropdown appears in form
✅ Table shows "Product ID" column
✅ Table shows "Price x Quantity"
✅ Can create order successfully
✅ Backend receives prodId, price, quantity
✅ Approve/Reject buttons work
```

### Notifications:
```
✅ Badge shows count in sidebar
✅ Badge shows count in header
✅ Page shows "X total notifications"
✅ Can delete notifications
✅ Count updates automatically
```

---

## 🔄 Complete Test Sequence

```bash
# 1. Start servers
cd C:\Users\Hp\Desktop\shyaka && npm start
cd C:\Users\Hp\Desktop\reactjs\simple && npm run dev

# 2. Test in browser
http://localhost:5173

# 3. Follow this order:
Register → Login → Create Shop → Create Product → Create Order → Approve → Check Notifications

# 4. Verify:
- Product has shop name
- Order has product info
- Notifications show count
- All CRUD works
```

---

**Everything should work perfectly now! 🚀**

If you see any errors, check:
1. Both servers are running
2. You created shop BEFORE product
3. You created product BEFORE order
4. You're logged in as admin or seller
