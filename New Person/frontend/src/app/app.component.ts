import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  personaForm!: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  submitted = false;

  // AI Generation Properties
  aiPrompt: string = '';
  aiGenerating: boolean = false;
  aiGeneratedImage: string | null = null;
  aiError: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.personaForm = this.formBuilder.group({
      personaName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      prompt: ['', [Validators.required, Validators.minLength(20)]],
      avatar: ['', Validators.required]
    });
  }

  // Generate AI Avatar
  generateAvatarAI() {
    if (!this.aiPrompt.trim()) {
      this.aiError = 'Please enter a prompt for AI generation';
      return;
    }

    this.aiGenerating = true;
    this.aiError = null;

    // Call backend endpoint for AI generation
    this.http.post('http://localhost:5000/api/generate-avatar', {
      prompt: this.aiPrompt
    }).subscribe({
      next: (response: any) => {
        this.aiGenerating = false;
        if (response.imageUrl) {
          this.aiGeneratedImage = response.imageUrl;
        }
      },
      error: (err) => {
        this.aiGenerating = false;
        this.aiError = 'Failed to generate avatar. Please try again or use a different prompt.';
        console.error('AI Generation Error:', err);
      }
    });
  }

  // Use Generated Avatar
  useGeneratedAvatar() {
    if (this.aiGeneratedImage) {
      this.imagePreview = this.aiGeneratedImage;
      this.personaForm.patchValue({ avatar: 'generated-avatar.png' });
      this.selectedFile = new File([this.aiGeneratedImage], 'generated-avatar.png', { type: 'image/png' });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.personaForm.patchValue({ avatar: file.name });
    }
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.personaForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('personaName', this.personaForm.value.personaName);
      formData.append('description', this.personaForm.value.description);
      formData.append('prompt', this.personaForm.value.prompt);
      formData.append('avatar', this.selectedFile);

      this.http.post('http://localhost:5000/api/person', formData).subscribe({
        next: (response) => {
          console.log('Entry submitted successfully!', response);
          alert('✨ Your persona has been submitted!');
          this.resetForm();
        },
        error: (err) => {
          console.error('Submission error:', err);
          alert('Error submitting form. Please try again.');
        }
      });
    }
  }

  resetForm() {
    this.personaForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
    this.submitted = false;
    this.aiPrompt = '';
    this.aiGeneratedImage = null;
    this.aiError = null;
  }

  get personaName() {
    return this.personaForm.get('personaName');
  }

  get description() {
    return this.personaForm.get('description');
  }

  get prompt() {
    return this.personaForm.get('prompt');
  }

  get avatar() {
    return this.personaForm.get('avatar');
  }
}
