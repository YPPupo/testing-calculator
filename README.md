# 🧮 Calculadora React + Vite - Testing Showcase

## 🎯 Objetivo del Proyecto
Demostrar habilidades completas en **Testing con JavaScript/TypeScript** usando tecnologías modernas:
- **Frontend**: React 18 + TypeScript + Vite
- **Testing**: Vitest + React Testing Library + Playwright
- **Styling**: Tailwind CSS
- **Arquitectura**: Custom Hooks + Componentes modulares

## ✨ Características Implementadas
- ✅ **Operaciones básicas**: suma, resta, multiplicación, división
- ✅ **Operaciones avanzadas**: potencia (x^y), raíz cuadrada
- ✅ **Historial de operaciones** con persistencia en sesión
- ✅ **Manejo robusto de errores** (división por cero, números inválidos)
- ✅ **Interfaz responsiva** con Tailwind CSS
- ✅ **Arquitectura limpia** con separación de responsabilidades

## 🧪 Testing Implementado

### **Unit Testing (Vitest + RTL)**
- ✅ **Lógica de negocio**: Calculator class (15+ tests)
- ✅ **Custom Hook**: useCalculator (8+ tests)
- ✅ **Componentes**: Button, Display, Calculator (12+ tests)
- ✅ **Edge cases**: errores, validaciones, estados límite

### **Integration Testing**
- ✅ **Flujos completos** de operaciones matemáticas
- ✅ **Interacción entre componentes** y estado
- ✅ **Manejo de historial** a través de múltiples operaciones
- ✅ **Recuperación de errores** y continuidad de operaciones

### **End-to-End Testing (Playwright)**
- ✅ **Flujos de usuario reales** en múltiples navegadores
- ✅ **Interacciones complejas** con la interfaz
- ✅ **Verificación visual** de elementos y estados
- ✅ **Tests cross-browser** (Chrome, Firefox, Safari)

## 📊 Métricas de Calidad
- **Cobertura de código**: >95%
- **Tests totales**: 35+ tests
- **Tiempo de ejecución**: <5 segundos
- **Cross-browser compatibility**: 3 navegadores

## 🚀 Comandos de Desarrollo

```bash
# Instalación
npm install

# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run preview         # Preview del build

# Testing
npm test                # Unit tests (watch mode)
npm run test:coverage   # Cobertura de código
npm run test:ui         # UI de Vitest
npm run test:e2e        # Tests E2E con Playwright
npm run test:e2e:ui     # UI de Playwright

# Linting
npm run lint            # ESLint
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Calculator.tsx   # Componente principal
│   ├── Display.tsx      # Display de la calculadora
│   ├── Button.tsx       # Botón reutilizable
│   └── History.tsx      # Historial de operaciones
├── hooks/
│   └── useCalculator.ts # Custom hook con lógica
├── utils/
│   └── calculator.ts    # Lógica de negocio pura
├── types/
│   └── calculator.types.ts # Tipos TypeScript
└── App.tsx             # Aplicación principal

tests/
├── unit/               # Tests unitarios
├── integration/        # Tests de integración
└── e2e/               # Tests end-to-end
```

## 🎯 Skills Técnicos Demostrados

### **Testing Avanzado**
- **Vitest configuration** con coverage personalizado
- **React Testing Library** para testing de componentes
- **Custom hooks testing** con renderHook
- **Playwright E2E** con múltiples navegadores
- **Mocking y stubbing** de dependencias
- **Async testing** y manejo de promesas

### **Desarrollo Frontend**
- **React 18** con hooks modernos
- **TypeScript** con tipado estricto
- **Custom Hooks** para lógica de estado
- **Component composition** y reutilización
- **Error boundaries** y manejo de errores

### **Herramientas Modernas**
- **Vite** para build y desarrollo rápido
- **Tailwind CSS** para styling eficiente
- **ESLint** para calidad de código
- **GitHub Actions ready** para CI/CD

## 📈 Casos de Uso de Testing

### **Unit Tests Destacados**
```typescript
// Validación de operaciones matemáticas
it('calcula operaciones complejas correctamente', () => {
  expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
  expect(calculator.power(2, 10)).toBe(1024);
});

// Manejo de errores robusto
it('maneja errores de validación', () => {
  expect(() => calculator.divide(5, 0))
    .toThrow('No se puede dividir por cero');
});
```

### **Integration Tests Destacados**
```typescript
// Flujos completos de usuario
it('realiza operaciones complejas manteniendo estado', () => {
  // (2 + 3) * 4 = 20
  // Simula clicks reales del usuario
  // Verifica estado y historial
});
```

### **E2E Tests Destacados**
```typescript
// Interacción real en navegador
test('funciona en múltiples navegadores', async ({ page }) => {
  // Tests reales de usuario final
  // Verificación visual
  // Cross-browser compatibility
});
```

## 🏆 Por Qué Este Proyecto Destaca

1. **Cobertura completa**: Unit + Integration + E2E
2. **Tecnologías modernas**: React 18 + Vite + TypeScript
3. **Arquitectura sólida**: Separación de responsabilidades
4. **Testing profesional**: Múltiples estrategias y herramientas
5. **Documentación completa**: README técnico detallado
6. **Fácil de expandir**: Arquitectura escalable

## 🎖️ Evidencia para Portafolio
- **Screenshots** de tests pasando
- **Reportes de cobertura** visuales
- **Videos** de E2E tests ejecutándose
- **Métricas** de performance y calidad
- **Código limpio** y bien documentado

---

**Creado como proyecto showcase de Testing para portafolio profesional** 🚀