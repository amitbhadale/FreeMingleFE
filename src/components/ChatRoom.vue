<template>
  <v-container class="chat-room" style="background-color: #fff5f8">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-0 d-flex flex-column chat-card">
          <!-- Messages -->
          <v-card-text class="chat-messages overflow-y-auto">
            <v-row dense v-if="!loading" class="flex-column flex-nowrap">
              <div
                v-for="msg in messages"
                :key="msg._id"
                class="d-flex"
                :class="msg.sender._id === userId ? 'justify-end' : 'justify-start'"
              >
                <div class="chat-bubble" :class="msg.sender._id === userId ? 'sent' : 'received'">
                  {{ msg.content }}
                </div>
              </div>
            </v-row>

            <div v-else class="text-center mt-4">
              <v-progress-circular indeterminate color="primary" />
              <div>Loading chat...</div>
            </div>
          </v-card-text>

          <!-- Sticky input -->
          <v-card-actions class="chat-input px-4 py-2">
            <v-text-field
              v-model="newMessage"
              placeholder="Type a message"
              hide-details
              outlined
              dense
              class="flex-grow-1"
              @keyup.enter="sendMessage"
            />
            <v-btn color="primary" @click="sendMessage" elevation="2">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { get, post } from '@/utils/api'
import { io } from 'socket.io-client'
import { useCommonStore } from '@/stores/commonStore'

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      loading: true,
      chatId: this.$route.params.chatId,
      // userId: null,
      socket: null,
      commonStore: null,
    }
  },
  async created() {
    this.commonStore = useCommonStore()
    // Setup socketgit
    // this.socket = io('http://localhost:5000') // adjust to your backend URL
    this.socket = io(import.meta.env.VITE_BACKEND_API_URL)
    this.socket.emit('joinRoom', this.chatId)

    // Listen for incoming messages
    this.socket.on('receiveMessage', (msg) => {
      this.messages.push(msg)
    })

    // Fetch existing messages
    try {
      const res = await get(`/messages/${this.chatId}`)
      this.messages = res
    } catch (err) {
      console.error('Failed to load messages', err)
    } finally {
      this.loading = false
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect()
    }
  },
  computed: {
    userId() {
      // read user id from commonstore
      return this.commonStore.userData?._id || null
    },
  },
  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return

      const msg = {
        chatId: this.chatId,
        content: this.newMessage,
      }

      try {
        const res = await post('/messages', msg)

        res.sender = { _id: this.userId }
        this.socket.emit('sendMessage', res)

        // this.messages.push(res)
        this.newMessage = ''
      } catch (err) {
        console.error('Send message failed:', err)
      }
    },
  },
}
</script>
<style scoped>
.chat-card {
  height: 90vh; /* Or use 100% if you're wrapping in a container */
  max-height: 90vh;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 16px;
}

.chat-input {
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  z-index: 10;
}

.chat-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  margin-bottom: 6px;
  word-wrap: break-word;
}

.sent {
  background-color: #cfe8fc;
  color: #0d47a1;
  align-self: flex-end;
}

.received {
  background-color: #e0e0e0;
  color: #212121;
  align-self: flex-start;
}
</style>
