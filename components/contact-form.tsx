'use client';

import type React from 'react';

import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { useState, useEffect, type FormEvent } from 'react';
import { AlertCircle, Loader2, Clock, X, Send, MessageCircleMore } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
  messagePrefix?: string;
}

export function ContactForm({ onSuccess, messagePrefix }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showTimeRemaining, setShowTimeRemaining] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string);
    const storedTime = localStorage.getItem('lastContactSubmitTime');
    if (storedTime) {
      const parsedTime = Number.parseInt(storedTime, 10);
      setLastSubmitTime(parsedTime);

      const currentTime = Date.now();
      const elapsedTime = currentTime - parsedTime;
      const waitTime = 30 * 60 * 1000;

      if (elapsedTime < waitTime) {
        setTimeRemaining(Math.ceil((waitTime - elapsedTime) / 1000));
        setShowTimeRemaining(true);
      }
    }
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0 || !showTimeRemaining) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeRemaining(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, showTimeRemaining]);

  useEffect(() => {
    if (messagePrefix) {
      setFormData((prev) => ({ ...prev, message: messagePrefix }));
    }
  }, [messagePrefix]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const checkTimeLimit = (): boolean => {
    if (!lastSubmitTime) return true;

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastSubmitTime;
    const waitTime = 30 * 60 * 1000; // 30 minutos em milissegundos

    if (elapsedTime < waitTime) {
      const remainingSeconds = Math.ceil((waitTime - elapsedTime) / 1000);
      setTimeRemaining(remainingSeconds);
      setShowTimeRemaining(true);
      return false;
    }

    return true;
  };

  const handleSubmitAttempt = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!checkTimeLimit()) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        toast({
          title: 'Erro',
          description: 'Variáveis de ambiente não estão definidas.',
        });
        return;
      }

      await emailjs
        .send(serviceId, templateId, {
          name: formData.name,
          message: formData.message,
          email: formData.email,
        })
        .then(
          (result) => {
            toast({
              title: 'Sucesso',
              description: 'Mensagem enviada com sucesso!',
            });
          },
          (error) => {
            toast({
              title: 'Erro ao enviar mensagem',
              description: 'Servidor indisponível, tente novamente mais tarde.',
            });
            console.error(error.text);
          }
        );

      const currentTime = Date.now();
      localStorage.setItem('lastContactSubmitTime', currentTime.toString());
      setLastSubmitTime(currentTime);
      setTimeRemaining(30 * 60);
      setShowTimeRemaining(true);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) {
      return;
    }
  
    const message = `*Contato via Cliqui*
  Nome: ${formData.name}
  Email: ${formData.email}
  
  ${formData.message}`;
  
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
    window.open(whatsappUrl, '_blank');
  
    toast({
      title: 'Abrindo WhatsApp',
      description: 'O WhatsApp foi aberto com sua mensagem.',
      duration: 3000,
    });
  };
  

  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {showTimeRemaining && (
        <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 p-4 mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Você já enviou uma mensagem recentemente. <br /> Por favor, aguarde {formatTimeRemaining(timeRemaining)}{' '}
              antes de enviar outra.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
            </p>
          </div>
        </div>
      )}

      {/* Modal de confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={cancelSubmit}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Confirmar envio</h3>
            <p className="mb-6">Você só poderá enviar outra mensagem após 30 minutos. Deseja continuar?</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelSubmit}>
                Cancelar
              </Button>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                onClick={handleConfirmSubmit}
              >
                Confirmar envio
              </Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitAttempt} className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Nome
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`flex h-10 w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Seu nome"
            disabled={isSubmitting}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`flex h-10 w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="seu@email.com"
            disabled={isSubmitting}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium leading-none">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`flex min-h-[100px] w-full rounded-md border ${
              errors.message ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Como podemos ajudar?"
            disabled={isSubmitting}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 mt-1">
              {errors.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            type="submit"
            size="lg"
            className="group w-full relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
            disabled={isSubmitting || showTimeRemaining}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : showTimeRemaining ? (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Aguarde {formatTimeRemaining(timeRemaining)}
              </>
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-1">
                  Enviar por email
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity group-hover:opacity-100"></span>
              </>
            )}
          </Button>

          <Button
            size="lg"
            type="button"
            variant="outline"
            className="w-full border-green-500/30 text-green-600 dark:text-green-500 hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400"
            onClick={handleSendWhatsApp}
            disabled={isSubmitting}
          >
            Enviar por WhatsApp
            <MessageCircleMore className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  );
}
