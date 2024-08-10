<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class MemberFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'name' => substr($this->faker->name(), 0, 20),
      'email' => $this->faker->unique()->safeEmail(),
      'tel' => $this->faker->phoneNumber(),
    ];
  }
}
