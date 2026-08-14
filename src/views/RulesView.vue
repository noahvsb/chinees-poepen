<script setup>
import { useRouter } from 'vue-router';
import PageHeader from '@/components/PageHeader.vue';

const router = useRouter();

function goBack() {
  if (window.history.state && window.history.state.back)
    router.back();
  else
    router.push('/');
}
</script>

<template>
  <div class="page">
    <button type="button" class="btn btn-primary top-right" @click="goBack">
      back to the table
    </button>

    <PageHeader title="rules" />

    <div class="panel">
      <h2 class="section-title">the shape of the night</h2>
      <p>
        Chinees Poepen is a trick-taking game where your hand grows one card at a
        time, up to a peak you set beforehand, then shrinks back down to a single
        card again. Whoever draws the shortest straw deals the first round. The
        app always tells you how many cards to deal, you're just following
        the pyramid up and back down.
      </p>
    </div>

    <div class="panel">
      <h2 class="section-title">dealing &amp; trump</h2>
      <p>Deal every player their cards for the round.</p>
      <p>Flip the next card in the deck, its suit is trump for the round.</p>
      <br>
      <p>Exception: the peak round is played without trump. If you're playing 3 peak rounds, only the middle round of the three has no trump.</p>
    </div>

    <div class="panel">
      <h2 class="section-title">guessing</h2>
      <p>
        Before a single card is played, everyone guesses how many tricks
        they'll win, starting with the player to the left of the dealer and
        going around.
      </p>
      <p class="mt-16">
        To make it fun, we guarantee that at least one person is screwed over: the guesses for the round
        can never add up to the total number of cards dealt. That means the
        dealer, who guesses last, is sometimes locked out of an option.
      </p>
      <div class="rules-example">
        <strong>Example:</strong> it's the first round, so everyone has 1
        card. If every other player guesses 0, the dealer isn't allowed to
        guess 1, they're forced to guess 0 too.
      </div>
    </div>

    <div class="panel">
      <h2 class="section-title">playing tricks</h2>
      <p>
        The player to the left of the dealer leads the first trick. From
        there, only two rules matter:
      </p>
      <ul class="rules-steps">
        <li>
          <span class="term">Follow suit.</span> If you can match the suit
          that was led, you have to.
        </li>
        <li>
          <span class="term">Table sticks.</span> Once a card is played, it's
          played ;)
        </li>
      </ul>
      <p class="mt-16">
        The trick is won by the highest card of the suit that was led. 
        Unless someone played trump, in which case the highest trump wins instead.
        Then the person who won the trick leads the next one.
      </p>
    </div>

    <div class="panel">
      <h2 class="section-title">scoring</h2>
      <p>Guessed wrong? You lose points equal to how far off you were:</p>
      <p><code>&minus;|guess &minus; got|</code></p>
      <p>Guessed right? You score points using whatever formula was set when the game was created.</p>
    </div>

    <div class="panel">
      <h2 class="section-title">optional: blind first and last round</h2>
      <p>
        To make the 1-card rounds more interesting, you can play them blind:
        hold your card facing outward so everyone can see it except you.
      </p>
    </div>

    <div class="btn-row">
      <button type="button" class="btn btn-primary" @click="goBack">
        back to the table
      </button>
    </div>
  </div>
</template>
