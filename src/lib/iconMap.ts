import type { LucideIcon } from 'lucide-react'
import {
  Settings, Truck, Wrench, ShieldCheck, Shield, Clock, Leaf, Award, Users,
  Zap, Star, MessageCircle, Package, Activity, Globe, Mountain, Bot, Wifi,
  Navigation, Sparkles, Snowflake, Scissors, BarChart2, Building, DollarSign,
  Droplets, Fuel, Phone, Mail, User, ChevronRight, ArrowRight, TreePine,
  Tractor, Recycle, FlaskConical, Layers, Cpu, Wind, Car, Bike, HardHat,
  Factory, Warehouse, GanttChart, CheckCircle2, MapPin, Sun, Camera,
} from 'lucide-react'

export const ICON_MAP: Record<string, LucideIcon> = {
  Truck, Wrench, ShieldCheck, Shield, Clock, Leaf, Award, Settings, Users,
  Zap, Star, MessageCircle, Package, Activity, Globe, Mountain, Bot, Wifi,
  Navigation, Sparkles, Snowflake, Scissors, BarChart2, Building, DollarSign,
  Droplets, Fuel, Phone, Mail, User, ChevronRight, ArrowRight, TreePine,
  Tractor, Recycle, FlaskConical, Layers, Cpu, Wind, Car, Bike, HardHat,
  Factory, Warehouse, GanttChart, CheckCircle2, MapPin, Sun, Camera,
}

export function getIcon(name?: string): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name]
  return Settings
}
