'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Code,
  Globe,
  Rocket,
  Zap,
  Star,
  ArrowRight,
  Users,
  Shield,
  MousePointer,
  BarChart,
  Target,
  Smartphone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Briefcase,
  CircleHelp,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { Carousel } from './ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Image from 'next/image';
import { ContactForm } from './contact-form';
import { useIsMobile } from '@/hooks/use-mobile';

export default function LandingPageClient() {
  const [messagePrefix, setMessagePrefix] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  const sobreRef = useRef<HTMLElement>(null);
  const recursosRef = useRef<HTMLElement>(null);
  const trabalhosRef = useRef<HTMLElement>(null);
  const precosRef = useRef<HTMLElement>(null);
  const clientesRef = useRef<HTMLElement>(null);
  const contatoRef = useRef<HTMLElement>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const headerHeight = isMobile ? 64 : 0;

    if (element) {
      setTimeout(() => {
        const offsetTop = element.offsetTop;
        window.scrollTo({
          top: offsetTop - headerHeight,
          behavior: 'smooth',
        });
      }, 200);
    }
  };

  const changeMessagePrefix = (message: string) => {
    setMessagePrefix('');
    setMessagePrefix(message);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      image: '/encontre-ja.png',
      title: 'EncontreJá',
      description: 'Site para buscar profissionais qualificados para serviços rápidos, sem complicação.',
      url: '#',
    },
    {
      id: 2,
      image: '/up-connection.png',
      title: 'UP Connection',
      description: 'Site institucional para empresa de consultoria financeira com formulários de contato e blog.',
      url: '#',
    },
    {
      id: 3,
      image: '/acelera-cursos.png',
      title: 'Acelera cursos',
      description:
        'Landing page para promover cursos ou treinamentos, destacando benefícios e facilitando a inscrição dos alunos.',
      url: '#',
    },
    {
      id: 4,
      image: '/portfolio-dimas.png',
      title: 'Portfólio',
      description: 'Landing page com design moderno e vibrante, destacando o portfólio tecnológico de Dimas Neto.',
      url: '#',
    },
  ];

  // Não renderize nada durante a hidratação para evitar erros
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-2 items-center text-xl font-bold">
            <div className="relative w-24 h-24">
              <Image src="/cliqui-logo.png" alt="UP Club Logo" fill className="object-contain" priority />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="#sobre"
              onClick={(e) => scrollToSection(e, 'sobre')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              O que são Landing Pages
            </Link>
            <Link
              href="#recursos"
              onClick={(e) => scrollToSection(e, 'recursos')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Recursos
            </Link>
            <Link
              href="#trabalhos"
              onClick={(e) => scrollToSection(e, 'trabalhos')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Portfólio
            </Link>
            <Link
              href="#precos"
              onClick={(e) => scrollToSection(e, 'precos')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Preços
            </Link>
            <Link
              href="#clientes"
              onClick={(e) => scrollToSection(e, 'clientes')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Clientes
            </Link>
            <Link
              href="#contato"
              onClick={(e) => scrollToSection(e, 'contato')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contato
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu
            links={[
              {
                href: '#sobre',
                label: 'O que são Landing Pages',
                onClick: (e) => {
                  scrollToSection(e, 'sobre');
                },
              },
              {
                href: '#recursos',
                label: 'Recursos',
                onClick: (e) => {
                  scrollToSection(e, 'recursos');
                },
              },
              {
                href: '#trabalhos',
                label: 'Portfólio',
                onClick: (e) => {
                  scrollToSection(e, 'trabalhos');
                },
              },
              {
                href: '#precos',
                label: 'Preços',
                onClick: (e) => {
                  scrollToSection(e, 'precos');
                },
              },
              {
                href: '#clientes',
                label: 'Clientes',
                onClick: (e) => {
                  scrollToSection(e, 'clientes');
                },
              },
              {
                href: '#contato',
                label: 'Contato',
                onClick: (e) => {
                  scrollToSection(e, 'contato');
                },
              },
            ]}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden mt-12 md:mt-0">
        <div className="container px-4 md:px-6 relative">
          {/* Background decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          >
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4"
                >
                  <Star className="mr-1 h-3.5 w-3.5" />
                  <span>Tecnologia NextJS</span>
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    Landing Pages
                  </span>{' '}
                  Rápidas, Baratas e Inovadoras
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A <span className="font-semibold text-primary">cliqüi</span> cria landing pages profissionais usando
                  NextJS, garantindo velocidade, qualidade e segurança para o seu domínio.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link
                  href="#contato"
                  onClick={(e) => {
                    scrollToSection(e, 'contato');
                    changeMessagePrefix('Olá, gostaria criar uma landing page para meu projeto...');
                  }}
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      Criar minha landing page
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </Link>
                <Link
                  href="#contato"
                  onClick={(e) => {
                    scrollToSection(e, 'contato');
                    changeMessagePrefix('Olá, gostaria de mais informações sobre os serviços e...');
                  }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary"
                  >
                    Fale conosco
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-primary/20 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 text-center">
                    <div className="relative mx-auto h-20 w-20">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm opacity-70 animate-pulse"></div>
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-background">
                        <Rocket className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Sua landing page aqui
                    </p>
                    <p className="text-sm text-muted-foreground">Rápida, moderna e otimizada</p>
                    <div className="pt-4 flex justify-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-secondary animate-pulse delay-100"></div>
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O que são Landing Pages Section */}
      <section id="sobre" ref={sobreRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <MousePointer className="mr-1 h-3.5 w-3.5" />
                <span>Entenda o Conceito</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                O que são{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Landing Pages
                </span>
                ?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Páginas de destino projetadas para converter visitantes em clientes.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6"
            >
              <p className="text-lg">
                Landing pages são páginas web específicas criadas com um único objetivo:{' '}
                <span className="font-semibold text-primary">converter visitantes em leads ou clientes</span>. Diferente
                de um site tradicional com múltiplas páginas e objetivos, uma landing page é focada em uma única oferta
                ou ação.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Target,
                    title: 'Foco em Conversão',
                    description:
                      'Cada elemento é pensado para levar o visitante a uma única ação, como gerar leads ou efetuar uma compra.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Alta Performance',
                    description:
                      'Estrutura otimizada para SEO, velocidade e experiência do usuário, maximizando o impacto da sua campanha.',
                  },
                  {
                    icon: BarChart,
                    title: 'Resultados Mensuráveis',
                    description:
                      'Integração com ferramentas de análise para acompanhar taxas de conversão, cliques e ROI com precisão.',
                  },
                  {
                    icon: MessageSquare,
                    title: 'Comunicação Direta',
                    description:
                      'Mensagens objetivas e visuais claros que eliminam distrações e destacam sua proposta de valor.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6"
            >
              <div className="relative h-[301px] overflow-hidden rounded-xl border border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <Smartphone className="h-10 w-10 mx-auto text-primary mb-3" />
                    <p className="text-lg font-medium">Otimizadas para dispositivos móveis</p>
                    <p className="text-sm text-muted-foreground mt-2">Experiência perfeita em qualquer tela</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Code,
                    title: 'Tecnologia Avançada',
                    description:
                      'Construídas com NextJS para garantir velocidade de carregamento e melhor experiência do usuário.',
                  },
                  {
                    icon: Shield,
                    title: 'Segurança Integrada',
                    description: 'Certificados SSL e proteções modernas para garantir a confiança dos seus visitantes.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (index + 2), duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl mt-8 text-center"
          >
            <Link href="#contato" onClick={(e) => scrollToSection(e, 'recursos')}>
              <Button className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground">
                <span className="relative z-10 flex items-center gap-1">
                  Conheça nossos recursos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" ref={recursosRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Recursos Exclusivos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Por que escolher a{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"><b>cliqüi</b></span>
                ?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Oferecemos soluções completas para sua presença online com tecnologia de ponta.
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Ultra Rápido',
                description:
                  'Seu site carrega em milissegundos, garantindo máxima performance e melhor ranqueamento no Google.',
                color: 'from-primary to-primary/70',
              },
              {
                icon: Globe,
                title: 'Domínio Seguro',
                description:
                  'Cuidamos de todo o processo: registro do domínio, instalação de SSL e configurações avançadas.',
                color: 'from-secondary to-secondary/70',
              },
              {
                icon: Code,
                title: 'Alta Tecnologia',
                description: 'Aplicações modernas com Next.js, arquitetura otimizada e escalabilidade garantida.',
                color: 'from-primary to-secondary',
              },
              {
                icon: Shield,
                title: 'Segurança Total',
                description:
                  'Firewall inteligente, monitoramento 24/7 e atualizações automáticas contra vulnerabilidades.',
                color: 'from-secondary to-primary',
              },
              {
                icon: Users,
                title: 'Suporte Dedicado',
                description: 'Equipe especializada pronta para ajudar com qualquer necessidade ou dúvida.',
                color: 'from-primary to-primary/70',
              },
              {
                icon: Star,
                title: 'Design Exclusivo',
                description: 'Layouts personalizados e únicos que destacam sua marca no mercado digital.',
                color: 'from-secondary to-secondary/70',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="group relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
                  <CardHeader className="relative">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r border border-primary/20 p-2">
                      <feature.icon className={`h-6 w-6 text-primary`} />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="trabalhos" ref={trabalhosRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Briefcase className="mr-1 h-3.5 w-3.5" />
                <span>Nossos Projetos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                Trabalhos{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Realizados
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Conheça alguns dos projetos que desenvolvemos e transformaram a presença online de nossos clientes.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto max-w-5xl py-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <h3 className="text-2xl font-bold">Resultados que Impressionam</h3>
                <p className="text-muted-foreground">
                  Nossos projetos não são apenas bonitos, eles são estrategicamente desenvolvidos para gerar resultados.
                  Cada landing page é otimizada para conversão, velocidade e experiência do usuário.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Aumento médio de 40% na taxa de conversão</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Tempo de carregamento inferior a 2 segundos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Design responsivo para todos os dispositivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>SEO otimizado para melhor posicionamento</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link
                    href="#contato"
                    onClick={(e) => {
                      scrollToSection(e, 'contato');
                      changeMessagePrefix('Olá, gostaria de uma landing page como as do portfólio e...');
                    }}
                  >
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground">
                      <span className="relative z-10 flex items-center gap-1">
                        Quero uma landing page assim
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-full"
              >
                <div className="w-full overflow-hidden rounded-xl border border-primary/20 shadow-lg">
                  <Carousel items={portfolioItems} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" ref={precosRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Star className="mr-1 h-3.5 w-3.5" />
                <span>Planos Acessíveis</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Invista no seu sucesso online</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Escolha o plano ideal para o seu negócio e comece a transformar sua presença digital.
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {[
              {
                title: 'De Boa na Web',
                price: 'R$299',
                description: 'Para quem está começando a jornada digital com o pé direito',
                features: [
                  'Landing page de até 4 seções',
                  'Domínio por 1 ano',
                  'Hospedagem incluída',
                  'Suporte por email e whatsapp',
                ],
                highlight: false,
                buttonText: 'Contratar',
              },
              {
                title: 'Crescendo na Web',
                price: 'R$499',
                description: 'Aquele empurrãozinho para quem já está com o negócio crescendo',
                features: [
                  'Landing page de até 7 seções',
                  'Domínio por 2 anos',
                  'Hospedagem incluída',
                  'Suporte por email e whatsapp',
                  'Formulário de contato',
                ],
                highlight: true,
                buttonText: 'Contratar Agora',
              },
              {
                title: 'Arrasando na Web',
                price: 'R$799',
                description: 'Para quem quer arrasar online e mostrar que chegou para ficar',
                features: [
                  'Landing page personalizada',
                  'Domínio por 3 anos',
                  'Hospedagem premium',
                  'Suporte prioritário',
                  'Formulário de contato',
                  'Ajustes mensais no design',
                  'Monitoramento de tráfego básico',
                ],
                highlight: false,
                buttonText: 'Contratar',
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    plan.highlight
                      ? 'border-primary/30 hover:shadow-primary/20'
                      : 'border-primary/10 hover:shadow-primary/10'
                  } hover:-translate-y-1`}
                >
                  {plan.highlight && (
                    <>
                      <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                      <div className="absolute -right-7 top-6 rotate-45 bg-gradient-to-r from-primary to-secondary px-10 py-1 text-xs font-medium text-primary-foreground">
                        Popular
                      </div>
                    </>
                  )}
                  <CardHeader className={plan.highlight ? 'bg-primary/5' : ''}>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mt-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature.includes('Domínio') ? (
                            <>
                              <span>{feature}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <CircleHelp className="text-primary"></CircleHelp>
                                  </TooltipTrigger>
                                  <TooltipContent>Consultar disponibilidade</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          ) : (
                            <span>{feature}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#contato"
                      onClick={(e) => {
                        scrollToSection(e, 'contato');
                        changeMessagePrefix(
                          `Olá, tenho interesse no plano ${plan.title} (${plan.price}) e gostaria de mais informações sobre...`
                        );
                      }}
                    >
                      <Button
                        className={`w-full group relative overflow-hidden ${
                          plan.highlight
                            ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground'
                            : ''
                        }`}
                      >
                        <span className="relative z-10">{plan.buttonText}</span>
                        {plan.highlight && (
                          <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                        )}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="clientes" ref={clientesRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Users className="mr-1 h-3.5 w-3.5" />
                <span>Clientes Satisfeitos</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">O que nossos clientes dizem</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Centenas de empresas já transformaram sua presença online com a Cliqui.
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Dimas Neto',
                company: 'Portfólio',
                testimonial: 'Meu portfólio ficou incrível e foi entregue muito rápido kkkkk. Recomendo!',
                initial: 'D',
              },
              {
                name: 'João Victor',
                company: 'Portfólio',
                testimonial: 'Ficou bão demais! Mandaram ver no meu portfólio, tá bonito do jeitim que eu queria!',
                initial: 'J',
              },
              {
                name: 'Beatriz Fernandes',
                company: 'Projeto',
                testimonial:
                  'Visual perfeitooo e deixaram tudo prontinho pra eu apresentar a Landing Page do meu site para a faculdade.',
                initial: 'B',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="text-center relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
                  <CardHeader className="relative">
                    <div className="mx-auto h-14 w-14 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary p-[2px]">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                        <span className="text-xl font-bold">{testimonial.initial}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground">"{testimonial.testimonial}"</p>
                    <div className="absolute -bottom-1 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contato"
        ref={contatoRef}
        className="w-full py-12 md:py-24 lg:py-32 border-t border-primary/10 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 lg:grid-cols-2 lg:gap-12"
          >
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  <Rocket className="mr-1 h-3.5 w-3.5" />
                  <span>Comece Agora</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pronto para transformar sua{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    presença online
                  </span>
                  ?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Entre em contato hoje mesmo e descubra como podemos ajudar seu negócio a crescer com uma landing page
                  profissional.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link
                  href="#contato"
                  onClick={(e) => {
                    scrollToSection(e, 'contato');
                    changeMessagePrefix('Olá, gostaria de mais informações sobre os serviços e...');
                  }}
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      Começar agora
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </Link>

                <Link
                  href="#contato"
                  onClick={(e) => {
                    scrollToSection(e, 'contato');
                    changeMessagePrefix('Olá, gostaria de agendar uma demonstração para ver como funciona e...');
                  }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary"
                  >
                    Agendar demonstração
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="rounded-xl border border-primary/20 bg-card p-6 shadow-sm w-full max-w-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
                <div className="relative space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Fale conosco</h3>
                    <p className="text-sm text-muted-foreground">
                      Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                    </p>
                  </div>
                  <ContactForm messagePrefix={messagePrefix} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-primary/10 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2 items-center text-lg font-bold">
            <div className="relative w-16 h-16">
              <Image src="/cliqui-logo.png" alt="UP Club Logo" fill className="object-contain" priority />
            </div>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Cliqui. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Theme Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <ThemeToggle />
      </motion.div>
    </div>
  );
}
