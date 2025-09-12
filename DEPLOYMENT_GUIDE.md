# Deployment Guide - Aadhaar Capital

## 🚀 Quick Fix for Current Build Issue

### **Problem**: Terser not found error
### **Solution**: Updated Vite config to use esbuild (faster and no extra dependencies)

## ✅ **Build Commands**

### **Local Build Test**
```bash
npm run build
```

### **Local Preview**
```bash
npm run preview
```

### **Development**
```bash
npm run dev
```

## 🔧 **Build Configuration Changes**

Updated `vite.config.ts` to:
- ✅ Use `esbuild` instead of `terser` (faster, no extra dependencies)
- ✅ Remove console logs in production
- ✅ Optimize bundle splitting
- ✅ Better asset organization

## 📦 **Vercel Deployment**

### **Automatic Deployment**
1. Push to your main branch
2. Vercel will automatically build and deploy
3. Build should now succeed with esbuild

### **Manual Deployment**
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

## 🎯 **Build Optimizations Included**

### **Performance**
- ✅ Code splitting (vendor, UI components)
- ✅ Asset optimization and hashing
- ✅ Console log removal in production
- ✅ Source map disabled for smaller builds
- ✅ CSS code splitting enabled

### **Bundle Analysis**
- **Vendor chunk**: React, React DOM
- **UI chunk**: Radix UI components
- **Main chunk**: Your application code

## 🔍 **Troubleshooting**

### **If Build Still Fails**

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be 18+ for best compatibility
   ```

3. **Vercel Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Terser not found | ✅ Fixed - using esbuild now |
| Out of memory | Add `--max-old-space-size=4096` to build command |
| Import errors | Check all import paths are correct |
| Asset not found | Verify asset paths in public folder |

## 📊 **Expected Build Output**

```
✓ 1789 modules transformed.
✓ building for production...
✓ dist/index.html                   0.xx kB
✓ dist/assets/vendor-xxxxx.js       xxx.xx kB
✓ dist/assets/ui-xxxxx.js          xxx.xx kB  
✓ dist/assets/index-xxxxx.js       xxx.xx kB
✓ dist/assets/index-xxxxx.css      xxx.xx kB
```

## 🌐 **Production Checklist**

### **Before Deployment**
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] No console errors in production build
- [ ] All routes work correctly
- [ ] Images load properly
- [ ] Forms submit successfully

### **After Deployment**
- [ ] Site loads fast (< 3 seconds)
- [ ] No console errors in browser
- [ ] All pages accessible
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] Performance score > 90

## 🎉 **Performance Benefits**

With the new build configuration:
- **Faster builds**: esbuild is 10-100x faster than terser
- **Smaller bundles**: Console logs removed, dead code eliminated
- **Better caching**: Optimized asset naming with hashes
- **Improved loading**: Code splitting reduces initial bundle size

## 📞 **Support**

If you encounter any build issues:
1. Check the error message in Vercel build logs
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Clear caches and rebuild

The build should now work perfectly on both local and Vercel! 🚀
